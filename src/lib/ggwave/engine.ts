import { protocolByKey } from "./protocols";
import type { GgwaveEnum, GgwaveModule, PacketSource, ProtocolKey } from "./types";

declare global {
  interface Window {
    ggwave_factory?: (opts?: Record<string, unknown>) => Promise<GgwaveModule>;
  }
}

const FRAME = 1024;

export function convertTypedArray<T extends ArrayBufferView>(
  src: ArrayBufferView,
  Ctor: new (buffer: ArrayBuffer) => T,
): T {
  const buffer = new ArrayBuffer(src.byteLength);
  const ctor = src.constructor as new (buffer: ArrayBuffer) => ArrayBufferView & {
    set: (array: ArrayLike<number>) => void;
  };
  const view = new ctor(buffer);
  view.set(src as unknown as ArrayLike<number>);
  return new Ctor(buffer);
}

export function waveformToFloat32(waveform: Int8Array): Float32Array {
  return convertTypedArray(waveform, Float32Array);
}

function rms(samples: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i] ?? 0;
    sum += v * v;
  }
  return Math.sqrt(sum / Math.max(1, samples.length));
}

async function loadModule(): Promise<GgwaveModule> {
  if (typeof window === "undefined") {
    throw new Error("The codec runs in the browser.");
  }
  const already = window.ggwave_factory;
  if (already) {
    return already();
  }

  await new Promise<void>((resolve, reject) => {
    const prev = document.querySelector<HTMLScriptElement>("script[data-ggwave]");
    if (prev) {
      if (typeof window.ggwave_factory === "function") {
        resolve();
        return;
      }
      prev.addEventListener("load", () => resolve(), { once: true });
      prev.addEventListener("error", () => reject(new Error("Failed to load ggwave.js")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "/ggwave/ggwave.js";
    script.async = true;
    script.dataset.ggwave = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load ggwave.js"));
    document.head.appendChild(script);
  });

  const factory = window.ggwave_factory;
  if (typeof factory !== "function") {
    throw new Error("ggwave factory missing after script load.");
  }
  return factory();
}

export type PacketHandler = (payload: {
  text: string;
  bytes: Uint8Array;
  source: PacketSource;
}) => void;

class GibberlinkEngine {
  module: GgwaveModule | null = null;
  context: AudioContext | null = null;
  analyser: AnalyserNode | null = null;
  sampleRate = 48000;
  private tap: GainNode | null = null;
  private txInstance: number | null = null;
  private rxInstance: number | null = null;
  private listenCleanup: (() => void) | null = null;
  private dss = false;
  private lastLiveText = "";
  private lastLiveAt = 0;
  private loading: Promise<void> | null = null;
  private graphReady = false;

  async load(): Promise<void> {
    if (this.module) return;
    if (this.loading) return this.loading;
    this.loading = this.boot();
    try {
      await this.loading;
    } finally {
      this.loading = null;
    }
  }

  private async boot() {
    const mod = await loadModule();
    try {
      mod.disableLog();
    } catch {
      /* older builds */
    }
    this.module = mod;
    this.reinitInstances();
    await this.selfTest();
  }

  private protocolEnum(key: ProtocolKey): GgwaveEnum {
    const mod = this.requireModule();
    const meta = protocolByKey(key);
    const value = mod.ProtocolId[meta.enumKey];
    if (!value) throw new Error(`Unknown protocol ${key}`);
    return value;
  }

  private requireModule(): GgwaveModule {
    if (!this.module) throw new Error("Codec is not loaded.");
    return this.module;
  }

  async ensureAudio(): Promise<AudioContext> {
    if (this.context && this.context.state !== "closed") {
      if (this.context.state === "suspended") {
        void this.context.resume().catch(() => undefined);
      }
      this.ensureGraph();
      return this.context;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.context = new Ctor({ sampleRate: 48000 });
    this.sampleRate = this.context.sampleRate;
    this.graphReady = false;
    this.ensureGraph();
    if (this.context.state === "suspended") {
      void this.context.resume().catch(() => undefined);
    }
    if (this.module) this.reinitInstances();
    return this.context;
  }

  private ensureGraph() {
    if (!this.context || this.graphReady) return;
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.55;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = -20;
    this.tap = this.context.createGain();
    this.tap.gain.value = 0;
    this.analyser.connect(this.tap);
    this.tap.connect(this.context.destination);
    this.graphReady = true;
  }

  setDss(enabled: boolean) {
    if (this.dss === enabled) return;
    this.dss = enabled;
    if (this.module) this.reinitInstances();
  }

  private makeParams(sampleRate: number) {
    const mod = this.requireModule();
    const parameters = mod.getDefaultParameters();
    parameters.sampleRateInp = sampleRate;
    parameters.sampleRateOut = sampleRate;
    parameters.sampleRate = sampleRate;
    if (this.dss) {
      parameters.operatingMode = parameters.operatingMode | mod.GGWAVE_OPERATING_MODE_USE_DSS;
    }
    return parameters;
  }

  private reinitInstances() {
    const mod = this.requireModule();
    if (this.txInstance != null) {
      try {
        mod.free(this.txInstance);
      } catch {
        /* ignore */
      }
    }
    if (this.rxInstance != null) {
      try {
        mod.free(this.rxInstance);
      } catch {
        /* ignore */
      }
    }
    const rate = this.context?.sampleRate ?? 48000;
    this.txInstance = mod.init(this.makeParams(rate));
    this.rxInstance = mod.init(this.makeParams(rate));
  }

  private async selfTest() {
    const mod = this.requireModule();
    const inst = mod.init(this.makeParams(this.sampleRate));
    try {
      const proto = this.protocolEnum("AUDIBLE_FAST");
      const raw = mod.encode(inst, "GIBBERLINK", proto, 30);
      const waveform = new Int8Array(raw);
      const decoded = mod.decode(inst, waveform);
      const text = decoded && decoded.length ? new TextDecoder().decode(decoded) : "";
      if (text !== "GIBBERLINK") {
        const viaChunks = this.decodeSamples(waveformToFloat32(waveform), inst);
        if (!viaChunks.includes("GIBBERLINK")) {
          throw new Error("Codec self-test failed.");
        }
      }
    } finally {
      try {
        mod.free(inst);
      } catch {
        /* ignore */
      }
    }
  }

  encode(
    payload: string,
    protocol: ProtocolKey,
    volume: number,
  ): { waveform: Int8Array; samples: Float32Array; durationMs: number } {
    const mod = this.requireModule();
    if (this.txInstance == null) this.reinitInstances();
    const trimmed = payload.slice(0, 140);
    if (!trimmed) throw new Error("Payload is empty.");
    const raw = mod.encode(
      this.txInstance!,
      trimmed,
      this.protocolEnum(protocol),
      Math.round(volume),
    );
    const waveform = new Int8Array(raw);
    const samples = waveformToFloat32(waveform);
    const durationMs = (samples.length / this.sampleRate) * 1000;
    return { waveform, samples, durationMs };
  }

  decodeSamples(samples: Float32Array, instance?: number): string[] {
    const mod = this.requireModule();
    const inst = instance ?? mod.init(this.makeParams(this.sampleRate));
    const owned = instance == null;
    const found: string[] = [];
    let last = "";
    try {
      for (let i = 0; i < samples.length; i += FRAME) {
        const end = Math.min(i + FRAME, samples.length);
        const slice = samples.subarray(i, end);
        const frame = new Float32Array(slice);
        const bytes = convertTypedArray(frame, Int8Array);
        const res = mod.decode(inst, bytes);
        if (res && res.length > 0) {
          const text = new TextDecoder("utf-8").decode(res);
          if (text && text !== last) {
            last = text;
            found.push(text);
          }
        }
      }
    } finally {
      if (owned) {
        try {
          mod.free(inst);
        } catch {
          /* ignore */
        }
      }
    }
    return found;
  }

  async playSamples(samples: Float32Array): Promise<void> {
    const ctx = await this.ensureAudio();
    const buffer = ctx.createBuffer(1, samples.length, ctx.sampleRate);
    buffer.getChannelData(0).set(samples);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    if (this.analyser) source.connect(this.analyser);
    source.connect(ctx.destination);
    await new Promise<void>((resolve, reject) => {
      source.onended = () => resolve();
      try {
        source.start(0);
      } catch (error) {
        reject(error);
      }
    });
  }

  async listen(handler: PacketHandler, onLevel?: (level: number) => void): Promise<void> {
    this.stopListen();
    const ctx = await this.ensureAudio();
    const mod = this.requireModule();
    this.reinitInstances();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        channelCount: 1,
      },
    });

    const source = ctx.createMediaStreamSource(stream);
    const silent = ctx.createGain();
    silent.gain.value = 0;

    let node: AudioNode | null = null;
    let worklet: AudioWorkletNode | null = null;
    let processor: ScriptProcessorNode | null = null;

    const consume = (frame: Float32Array) => {
      onLevel?.(Math.min(1, rms(frame) * 6));
      if (this.rxInstance == null) return;
      const bytes = convertTypedArray(new Float32Array(frame), Int8Array);
      const res = mod.decode(this.rxInstance, bytes);
      if (res && res.length > 0) {
        const text = new TextDecoder("utf-8").decode(res);
        const now = Date.now();
        if (text && (text !== this.lastLiveText || now - this.lastLiveAt > 1600)) {
          this.lastLiveText = text;
          this.lastLiveAt = now;
          handler({ text, bytes: Uint8Array.from(res), source: "live" });
        }
      }
    };

    try {
      await ctx.audioWorklet.addModule("/ggwave/capture-processor.js");
      worklet = new AudioWorkletNode(ctx, "capture-processor", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        channelCount: 1,
      });
      worklet.port.onmessage = (event: MessageEvent<Float32Array>) => {
        consume(event.data);
      };
      source.connect(worklet);
      worklet.connect(silent);
      silent.connect(ctx.destination);
      node = worklet;
    } catch {
      processor = ctx.createScriptProcessor(FRAME, 1, 1);
      processor.onaudioprocess = (event) => {
        consume(event.inputBuffer.getChannelData(0));
      };
      source.connect(processor);
      processor.connect(silent);
      silent.connect(ctx.destination);
      node = processor;
    }

    if (this.analyser) {
      source.connect(this.analyser);
    }

    this.listenCleanup = () => {
      try {
        source.disconnect();
      } catch {
        /* ignore */
      }
      try {
        node?.disconnect();
      } catch {
        /* ignore */
      }
      try {
        silent.disconnect();
      } catch {
        /* ignore */
      }
      if (worklet) worklet.port.onmessage = null;
      if (processor) processor.onaudioprocess = null;
      stream.getTracks().forEach((track) => track.stop());
    };
  }

  stopListen() {
    this.listenCleanup?.();
    this.listenCleanup = null;
  }

  isListening() {
    return this.listenCleanup != null;
  }

  decodeAudioBuffer(buffer: AudioBuffer): string[] {
    const samples = buffer.getChannelData(0);
    const copy = new Float32Array(samples);
    const mod = this.requireModule();
    const inst = mod.init(this.makeParams(buffer.sampleRate));
    try {
      return this.decodeSamples(copy, inst);
    } finally {
      try {
        mod.free(inst);
      } catch {
        /* ignore */
      }
    }
  }
}

export const engine = new GibberlinkEngine();
