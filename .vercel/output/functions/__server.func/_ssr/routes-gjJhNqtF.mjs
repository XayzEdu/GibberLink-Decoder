import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Mic, c as Copy, i as Play, l as Check, o as MicOff, r as Trash2, s as Download, t as Upload } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-gjJhNqtF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			accent: "bg-accent text-accent-foreground hover:opacity-90",
			outline: "bg-transparent text-foreground shadow-instrument hover:shadow-instrument-hover",
			ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		type: "button",
		...props
	});
});
Button.displayName = "Button";
var PROTOCOLS = [
	{
		key: "AUDIBLE_NORMAL",
		enumKey: "GGWAVE_PROTOCOL_AUDIBLE_NORMAL",
		label: "Audible Normal",
		short: "Normal",
		group: "audible",
		rate: "~8 B/s",
		band: "1.9–6.4 kHz",
		hint: "Slowest, most robust over noisy speakers"
	},
	{
		key: "AUDIBLE_FAST",
		enumKey: "GGWAVE_PROTOCOL_AUDIBLE_FAST",
		label: "Audible Fast",
		short: "Fast",
		group: "audible",
		rate: "~12 B/s",
		band: "1.9–6.4 kHz",
		hint: "GibberLink default — the viral hotel-booking burst"
	},
	{
		key: "AUDIBLE_FASTEST",
		enumKey: "GGWAVE_PROTOCOL_AUDIBLE_FASTEST",
		label: "Audible Fastest",
		short: "Fastest",
		group: "audible",
		rate: "~16 B/s",
		band: "1.9–6.4 kHz",
		hint: "Shortest tones; needs a clean acoustic path"
	},
	{
		key: "ULTRASOUND_NORMAL",
		enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_NORMAL",
		label: "Ultrasound Normal",
		short: "[U] Normal",
		group: "ultrasound",
		rate: "~8 B/s",
		band: "15–19 kHz",
		hint: "Near the edge of hearing; many laptop speakers roll off"
	},
	{
		key: "ULTRASOUND_FAST",
		enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_FAST",
		label: "Ultrasound Fast",
		short: "[U] Fast",
		group: "ultrasound",
		rate: "~12 B/s",
		band: "15–19 kHz",
		hint: "Quiet to most people; hit-or-miss on phone mics"
	},
	{
		key: "ULTRASOUND_FASTEST",
		enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_FASTEST",
		label: "Ultrasound Fastest",
		short: "[U] Fastest",
		group: "ultrasound",
		rate: "~16 B/s",
		band: "15–19 kHz",
		hint: "Fastest ultrasonic; easiest to miss"
	},
	{
		key: "DT_NORMAL",
		enumKey: "GGWAVE_PROTOCOL_DT_NORMAL",
		label: "Dual-tone Normal",
		short: "[DT] Normal",
		group: "dual-tone",
		rate: "~3 B/s",
		band: "narrow FSK",
		hint: "Two tones per symbol, slower and distinct"
	},
	{
		key: "DT_FAST",
		enumKey: "GGWAVE_PROTOCOL_DT_FAST",
		label: "Dual-tone Fast",
		short: "[DT] Fast",
		group: "dual-tone",
		rate: "~6 B/s",
		band: "narrow FSK",
		hint: "Dual-tone middle speed"
	},
	{
		key: "DT_FASTEST",
		enumKey: "GGWAVE_PROTOCOL_DT_FASTEST",
		label: "Dual-tone Fastest",
		short: "[DT] Fastest",
		group: "dual-tone",
		rate: "~9 B/s",
		band: "narrow FSK",
		hint: "Dual-tone, shortest frames"
	}
];
var AUDIBLE_KEYS = [
	"AUDIBLE_NORMAL",
	"AUDIBLE_FAST",
	"AUDIBLE_FASTEST"
];
function protocolByKey(key) {
	const found = PROTOCOLS.find((p) => p.key === key);
	if (!found) return PROTOCOLS[1];
	return found;
}
var FRAME = 1024;
function convertTypedArray(src, Ctor) {
	const buffer = new ArrayBuffer(src.byteLength);
	const ctor = src.constructor;
	new ctor(buffer).set(src);
	return new Ctor(buffer);
}
function waveformToFloat32(waveform) {
	return convertTypedArray(waveform, Float32Array);
}
function rms(samples) {
	let sum = 0;
	for (let i = 0; i < samples.length; i++) {
		const v = samples[i] ?? 0;
		sum += v * v;
	}
	return Math.sqrt(sum / Math.max(1, samples.length));
}
async function loadModule() {
	if (typeof window === "undefined") throw new Error("The codec runs in the browser.");
	if (typeof window.ggwave_factory === "function") return window.ggwave_factory();
	await new Promise((resolve, reject) => {
		const prev = document.querySelector("script[data-ggwave]");
		if (prev) {
			if (typeof window.ggwave_factory === "function") {
				resolve();
				return;
			}
			prev.addEventListener("load", () => resolve(), { once: true });
			prev.addEventListener("error", () => reject(/* @__PURE__ */ new Error("Failed to load ggwave.js")), { once: true });
			return;
		}
		const script = document.createElement("script");
		script.src = "/ggwave/ggwave.js";
		script.async = true;
		script.dataset.ggwave = "1";
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load ggwave.js"));
		document.head.appendChild(script);
	});
	if (typeof window.ggwave_factory !== "function") throw new Error("ggwave factory missing after script load.");
	return window.ggwave_factory();
}
var GibberlinkEngine = class {
	module = null;
	context = null;
	analyser = null;
	sampleRate = 48e3;
	tap = null;
	txInstance = null;
	rxInstance = null;
	listenCleanup = null;
	dss = false;
	lastLiveText = "";
	lastLiveAt = 0;
	loading = null;
	graphReady = false;
	async load() {
		if (this.module) return;
		if (this.loading) return this.loading;
		this.loading = this.boot();
		try {
			await this.loading;
		} finally {
			this.loading = null;
		}
	}
	async boot() {
		const mod = await loadModule();
		try {
			mod.disableLog();
		} catch {}
		this.module = mod;
		await this.ensureAudio();
		this.reinitInstances();
		await this.selfTest();
	}
	protocolEnum(key) {
		const mod = this.requireModule();
		const meta = protocolByKey(key);
		const value = mod.ProtocolId[meta.enumKey];
		if (!value) throw new Error(`Unknown protocol ${key}`);
		return value;
	}
	requireModule() {
		if (!this.module) throw new Error("Codec is not loaded.");
		return this.module;
	}
	async ensureAudio() {
		if (this.context && this.context.state !== "closed") {
			if (this.context.state === "suspended") await this.context.resume().catch(() => void 0);
			this.ensureGraph();
			return this.context;
		}
		const Ctor = window.AudioContext || window.webkitAudioContext;
		this.context = new Ctor({ sampleRate: 48e3 });
		this.sampleRate = this.context.sampleRate;
		this.graphReady = false;
		this.ensureGraph();
		if (this.context.state === "suspended") await this.context.resume().catch(() => void 0);
		if (this.module) this.reinitInstances();
		return this.context;
	}
	ensureGraph() {
		if (!this.context || this.graphReady) return;
		this.analyser = this.context.createAnalyser();
		this.analyser.fftSize = 2048;
		this.analyser.smoothingTimeConstant = .55;
		this.analyser.minDecibels = -90;
		this.analyser.maxDecibels = -20;
		this.tap = this.context.createGain();
		this.tap.gain.value = 0;
		this.analyser.connect(this.tap);
		this.tap.connect(this.context.destination);
		this.graphReady = true;
	}
	setDss(enabled) {
		if (this.dss === enabled) return;
		this.dss = enabled;
		if (this.module) this.reinitInstances();
	}
	makeParams(sampleRate) {
		const mod = this.requireModule();
		const parameters = mod.getDefaultParameters();
		parameters.sampleRateInp = sampleRate;
		parameters.sampleRateOut = sampleRate;
		parameters.sampleRate = sampleRate;
		if (this.dss) parameters.operatingMode = parameters.operatingMode | mod.GGWAVE_OPERATING_MODE_USE_DSS;
		return parameters;
	}
	reinitInstances() {
		const mod = this.requireModule();
		if (this.txInstance != null) try {
			mod.free(this.txInstance);
		} catch {}
		if (this.rxInstance != null) try {
			mod.free(this.rxInstance);
		} catch {}
		const rate = this.context?.sampleRate ?? 48e3;
		this.txInstance = mod.init(this.makeParams(rate));
		this.rxInstance = mod.init(this.makeParams(rate));
	}
	async selfTest() {
		const mod = this.requireModule();
		const inst = mod.init(this.makeParams(this.sampleRate));
		try {
			const proto = this.protocolEnum("AUDIBLE_FAST");
			const raw = mod.encode(inst, "GIBBERLINK", proto, 30);
			const waveform = new Int8Array(raw);
			const decoded = mod.decode(inst, waveform);
			if ((decoded && decoded.length ? new TextDecoder().decode(decoded) : "") !== "GIBBERLINK") {
				if (!this.decodeSamples(waveformToFloat32(waveform), inst).includes("GIBBERLINK")) throw new Error("Codec self-test failed.");
			}
		} finally {
			try {
				mod.free(inst);
			} catch {}
		}
	}
	encode(payload, protocol, volume) {
		const mod = this.requireModule();
		if (this.txInstance == null) this.reinitInstances();
		const trimmed = payload.slice(0, 140);
		if (!trimmed) throw new Error("Payload is empty.");
		const raw = mod.encode(this.txInstance, trimmed, this.protocolEnum(protocol), Math.round(volume));
		const waveform = new Int8Array(raw);
		const samples = waveformToFloat32(waveform);
		return {
			waveform,
			samples,
			durationMs: samples.length / this.sampleRate * 1e3
		};
	}
	decodeSamples(samples, instance) {
		const mod = this.requireModule();
		const inst = instance ?? mod.init(this.makeParams(this.sampleRate));
		const owned = instance == null;
		const found = [];
		let last = "";
		try {
			for (let i = 0; i < samples.length; i += FRAME) {
				const end = Math.min(i + FRAME, samples.length);
				const slice = samples.subarray(i, end);
				const bytes = convertTypedArray(new Float32Array(slice), Int8Array);
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
			if (owned) try {
				mod.free(inst);
			} catch {}
		}
		return found;
	}
	async playSamples(samples) {
		const ctx = await this.ensureAudio();
		const buffer = ctx.createBuffer(1, samples.length, ctx.sampleRate);
		buffer.getChannelData(0).set(samples);
		const source = ctx.createBufferSource();
		source.buffer = buffer;
		if (this.analyser) source.connect(this.analyser);
		source.connect(ctx.destination);
		await new Promise((resolve, reject) => {
			source.onended = () => resolve();
			try {
				source.start(0);
			} catch (error) {
				reject(error);
			}
		});
	}
	async listen(handler, onLevel) {
		this.stopListen();
		const ctx = await this.ensureAudio();
		const mod = this.requireModule();
		this.reinitInstances();
		const stream = await navigator.mediaDevices.getUserMedia({ audio: {
			echoCancellation: false,
			autoGainControl: false,
			noiseSuppression: false,
			channelCount: 1
		} });
		const source = ctx.createMediaStreamSource(stream);
		const silent = ctx.createGain();
		silent.gain.value = 0;
		let node = null;
		let worklet = null;
		let processor = null;
		const consume = (frame) => {
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
					handler({
						text,
						bytes: Uint8Array.from(res),
						source: "live"
					});
				}
			}
		};
		try {
			await ctx.audioWorklet.addModule("/ggwave/capture-processor.js");
			worklet = new AudioWorkletNode(ctx, "capture-processor", {
				numberOfInputs: 1,
				numberOfOutputs: 1,
				channelCount: 1
			});
			worklet.port.onmessage = (event) => {
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
		if (this.analyser) source.connect(this.analyser);
		this.listenCleanup = () => {
			try {
				source.disconnect();
			} catch {}
			try {
				node?.disconnect();
			} catch {}
			try {
				silent.disconnect();
			} catch {}
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
	decodeAudioBuffer(buffer) {
		const samples = buffer.getChannelData(0);
		const copy = new Float32Array(samples);
		const mod = this.requireModule();
		const inst = mod.init(this.makeParams(buffer.sampleRate));
		try {
			return this.decodeSamples(copy, inst);
		} finally {
			try {
				mod.free(inst);
			} catch {}
		}
	}
};
var engine = new GibberlinkEngine();
var STORAGE_KEY = "gibberlink.packets.v1";
var MAX_PACKETS = 80;
function parseJson(text) {
	const trimmed = text.trim();
	if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
	try {
		return JSON.parse(trimmed);
	} catch {
		return null;
	}
}
function toPacket(input) {
	const bytes = input.bytes ? Array.from(input.bytes) : Array.from(new TextEncoder().encode(input.text));
	return {
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		t: Date.now(),
		text: input.text,
		bytes,
		source: input.source,
		json: parseJson(input.text)
	};
}
function persist(packets) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(packets.slice(0, MAX_PACKETS)));
	} catch {}
}
var useDecoder = create((set, get) => ({
	codec: "idle",
	codecError: null,
	tab: "listen",
	listening: false,
	transmitting: false,
	level: 0,
	protocol: "AUDIBLE_FAST",
	volume: 45,
	dss: false,
	payload: "GIBBERLINK_MODE_ON",
	packets: [],
	selectedId: null,
	fileName: null,
	fileProgress: null,
	setTab: (tab) => set({ tab }),
	setCodec: (codec, error = null) => set({
		codec,
		codecError: error
	}),
	setListening: (listening) => set({
		listening,
		level: listening ? get().level : 0
	}),
	setTransmitting: (transmitting) => set({ transmitting }),
	setLevel: (level) => set({ level }),
	setProtocol: (protocol) => set({ protocol }),
	setVolume: (volume) => set({ volume }),
	setDss: (dss) => set({ dss }),
	setPayload: (payload) => set({ payload }),
	setFile: (fileName, fileProgress) => set({
		fileName,
		fileProgress
	}),
	addPacket: (input) => {
		const packet = toPacket(input);
		const packets = [packet, ...get().packets].slice(0, MAX_PACKETS);
		persist(packets);
		set({
			packets,
			selectedId: packet.id
		});
	},
	select: (id) => set({ selectedId: id }),
	clear: () => {
		persist([]);
		set({
			packets: [],
			selectedId: null
		});
	},
	hydrate: () => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed) || parsed.length === 0) return;
			set({
				packets: parsed.slice(0, MAX_PACKETS),
				selectedId: parsed[0]?.id ?? null
			});
		} catch {}
	}
}));
function FilePanel() {
	const inputRef = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const fileName = useDecoder((s) => s.fileName);
	const progress = useDecoder((s) => s.fileProgress);
	const setFile = useDecoder((s) => s.setFile);
	const addPacket = useDecoder((s) => s.addPacket);
	const setCodec = useDecoder((s) => s.setCodec);
	const [message, setMessage] = (0, import_react.useState)(null);
	const handleFile = async (file) => {
		if (!file) return;
		setMessage(null);
		setFile(file.name, 0);
		try {
			await engine.load();
			setCodec("ready");
			const ctx = await engine.ensureAudio();
			const bytes = await file.arrayBuffer();
			setFile(file.name, .4);
			const audio = await ctx.decodeAudioData(bytes.slice(0));
			setFile(file.name, .7);
			const texts = engine.decodeAudioBuffer(audio);
			if (texts.length === 0) setMessage("No GibberLink frames found in that file.");
			else {
				for (const text of texts) addPacket({
					text,
					source: "file"
				});
				setMessage(`Recovered ${texts.length} packet${texts.length === 1 ? "" : "s"}.`);
			}
			setFile(file.name, 1);
		} catch (error) {
			const text = error instanceof Error ? error.message : "Could not decode that file.";
			setMessage(text);
			setCodec("error", text);
			setFile(file.name, null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-sm leading-relaxed text-muted-foreground",
				children: "Drop a WAV, MP3, or other audio clip — including a recording of two agents in GibberLink mode. The decoder walks the file in 1024-sample frames, the same path used for live audio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragEnter: (e) => {
					e.preventDefault();
					setDrag(true);
				},
				onDragOver: (e) => {
					e.preventDefault();
					setDrag(true);
				},
				onDragLeave: () => setDrag(false),
				onDrop: (e) => {
					e.preventDefault();
					setDrag(false);
					handleFile(e.dataTransfer.files[0]);
				},
				className: cn("flex min-h-36 flex-col items-center justify-center gap-3 rounded-lg bg-secondary px-4 py-8 text-center shadow-instrument transition-[box-shadow] duration-150", drag && "shadow-instrument-hover"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-foreground",
						children: "Drop audio here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: "WAV · MP3 · OGG · M4A · FLAC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => inputRef.current?.click(),
						children: "Choose file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "audio/*,video/webm,video/mp4,.wav,.mp3,.ogg,.m4a,.flac",
						className: "sr-only",
						onChange: (e) => {
							handleFile(e.target.files?.[0]);
							e.target.value = "";
						}
					})
				]
			}),
			fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-muted-foreground",
				children: [fileName, progress != null ? ` · ${Math.round(progress * 100)}%` : null]
			}) : null,
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-foreground",
				children: message
			}) : null
		]
	});
}
function GuidePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-prose flex-col gap-5 text-sm leading-relaxed text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground",
				children: "GibberLink is not a secret language. It is a 2025 ElevenLabs hackathon demo by Boris Starkov and Anton Pidkuiko: two voice agents start in English, notice they are both machines, and switch to ggwave — data-over-sound — instead of wasting tokens on speech."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-medium text-foreground",
				children: "What you are hearing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ggwave (Georgi Gerganov) paints a payload onto audible FSK tones, typically from 1.875 kHz with Reed-Solomon recovery. Bandwidth is only 8–16 bytes per second, so agents send compact JSON, not paragraphs. To a person it sounds like a short modem chirp. This decoder is a receiver for that chirp." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-medium text-foreground",
				children: "How to use it"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "list-decimal space-y-2 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "On this device, open Transmit, pick a preset, and press Play and decode. The log should show the payload immediately — no microphone required." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "On a second phone or laptop, open this same app, start the receiver, then play a burst from the first device with the speakers facing the mic." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Or drop a recording of a GibberLink exchange (or the original demo video’s audio) onto the File tab." })
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ultrasound protocols sit near 15 kHz and often fail on laptop speakers. Stay on Audible Fast unless you know both ends can hear that high." })
		]
	});
}
function formatTime(ts) {
	return new Date(ts).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
}
function formatDuration(ms) {
	if (ms < 1e3) return `${Math.round(ms)} ms`;
	return `${(ms / 1e3).toFixed(1)} s`;
}
function hexDump(bytes) {
	const lines = [];
	for (let i = 0; i < bytes.length; i += 16) {
		const slice = bytes.slice(i, i + 16);
		const hex = slice.map((b) => b.toString(16).padStart(2, "0")).join(" ").padEnd(47, " ");
		const ascii = slice.map((b) => b >= 32 && b < 127 ? String.fromCharCode(b) : ".").join("");
		lines.push(`${i.toString(16).padStart(4, "0")}  ${hex}  ${ascii}`);
	}
	return lines.join("\n") || "—";
}
function sourceLabel(source) {
	switch (source) {
		case "live": return "Receiver";
		case "file": return "File";
		case "loopback": return "Transmit";
		case "self-test": return "Self-test";
		default: return source;
	}
}
function Inspector() {
	const packets = useDecoder((s) => s.packets);
	const selectedId = useDecoder((s) => s.selectedId);
	const packet = packets.find((p) => p.id === selectedId) ?? packets[0];
	const [copied, setCopied] = (0, import_react.useState)(null);
	const copy = async (kind, value) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(kind);
			window.setTimeout(() => setCopied(null), 1200);
		} catch {}
	};
	if (!packet) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "instrument rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: "Inspector"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-lg font-medium tracking-tight",
				children: "Payload"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Select a packet to inspect UTF-8, JSON, and hex."
			})
		]
	});
	const hex = hexDump(packet.bytes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "instrument flex min-h-0 flex-col rounded-xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: ["Inspector · ", sourceLabel(packet.source)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium tracking-tight",
				children: "Payload"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs tabular-nums text-muted-foreground",
				children: [packet.bytes.length, " B"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
						children: "UTF-8"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => copy("text", packet.text),
						children: [copied === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-28 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-foreground",
					children: packet.text
				})] }),
				packet.json != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground",
					children: "JSON"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-36 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-accent",
					children: JSON.stringify(packet.json, null, 2)
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
						children: "Hex"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => copy("hex", hex),
						children: [copied === "hex" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-32 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-muted-foreground",
					children: hex
				})] })
			]
		})]
	});
}
function ListenPanel() {
	const listening = useDecoder((s) => s.listening);
	const codec = useDecoder((s) => s.codec);
	const level = useDecoder((s) => s.level);
	const setListening = useDecoder((s) => s.setListening);
	const setLevel = useDecoder((s) => s.setLevel);
	const addPacket = useDecoder((s) => s.addPacket);
	const setCodec = useDecoder((s) => s.setCodec);
	const toggle = async () => {
		if (listening) {
			engine.stopListen();
			setListening(false);
			return;
		}
		try {
			await engine.load();
			setCodec("ready");
			await engine.listen((packet) => addPacket(packet), (value) => setLevel(value));
			setListening(true);
		} catch (error) {
			setListening(false);
			const message = error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone permission was denied. Use Transmit or File instead." : error instanceof Error ? error.message : "Could not start the receiver.";
			setCodec("error", message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-sm leading-relaxed text-muted-foreground",
				children: "Open the microphone and decode GibberLink / ggwave bursts in real time. Best with a second device transmitting, or play a recording next to this one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: listening ? "outline" : "accent",
				onClick: toggle,
				disabled: codec === "loading",
				className: "w-full sm:w-auto",
				children: [listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {}), listening ? "Stop receiver" : "Start receiver"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Input level" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [Math.round(level * 100), "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 overflow-hidden rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent transition-[width] duration-100",
					style: { width: `${Math.round(level * 100)}%` }
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Echo cancellation is off so FSK tones survive the capture path." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Identical payloads within 1.6 s are folded into one packet." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "If the preview blocks the mic, transmit a burst on this page — it decodes itself." })
				]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-wider", {
	variants: { variant: {
		default: "bg-secondary text-muted-foreground",
		accent: "bg-accent/15 text-accent",
		live: "bg-accent/15 text-accent",
		outline: "text-muted-foreground shadow-instrument"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function PacketLog() {
	const packets = useDecoder((s) => s.packets);
	const selectedId = useDecoder((s) => s.selectedId);
	const select = useDecoder((s) => s.select);
	const clear = useDecoder((s) => s.clear);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "instrument flex min-h-0 flex-1 flex-col rounded-xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: "Log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium tracking-tight",
				children: "Packets"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: clear,
				disabled: packets.length === 0,
				"aria-label": "Clear packet log",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Clear"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto pr-1",
			children: packets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-sm text-muted-foreground",
				children: "No packets yet. Start the receiver, transmit a burst, or drop an audio file."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1.5",
				children: packets.map((packet) => {
					const selected = packet.id === selectedId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "packet-enter",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => select(packet.id),
							className: cn("flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-left transition-[background-color,box-shadow] duration-150", selected ? "bg-secondary shadow-instrument" : "hover:bg-secondary/70"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tabular-nums text-muted-foreground",
									children: formatTime(packet.t)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: packet.source === "live" ? "accent" : "default",
									children: sourceLabel(packet.source)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-sm text-foreground",
								children: packet.text
							})]
						})
					}, packet.id);
				})
			})
		})]
	});
}
function colorAt(t) {
	const stops = [
		[
			0,
			12,
			13,
			12
		],
		[
			.18,
			28,
			36,
			30
		],
		[
			.45,
			90,
			128,
			104
		],
		[
			.72,
			138,
			168,
			146
		],
		[
			1,
			238,
			238,
			232
		]
	];
	const x = Math.max(0, Math.min(1, t));
	let i = 0;
	while (i < stops.length - 2 && x > (stops[i + 1]?.[0] ?? 1)) i += 1;
	const a = stops[i];
	const b = stops[i + 1];
	const span = b[0] - a[0] || 1;
	const u = (x - a[0]) / span;
	return [
		Math.round(a[1] + (b[1] - a[1]) * u),
		Math.round(a[2] + (b[2] - a[2]) * u),
		Math.round(a[3] + (b[3] - a[3]) * u)
	];
}
function Spectrogram({ analyser, active, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;
		let raf = 0;
		let bins = /* @__PURE__ */ new Uint8Array(1024);
		const idle = { t: 0 };
		const resize = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			canvas.width = Math.max(1, Math.floor(w * dpr));
			canvas.height = Math.max(1, Math.floor(h * dpr));
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.fillStyle = "#0c0d0c";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};
		resize();
		const observer = new ResizeObserver(resize);
		if (canvas.parentElement) observer.observe(canvas.parentElement);
		const draw = () => {
			raf = requestAnimationFrame(draw);
			const w = canvas.width;
			const h = canvas.height;
			if (w < 2 || h < 2) return;
			ctx.drawImage(canvas, 0, 0, w, h - 2, 0, 2, w, h - 2);
			const nyquist = (analyser?.context.sampleRate ?? 48e3) / 2;
			const usable = Math.min(1, 8e3 / nyquist);
			if (analyser && active) {
				if (bins.length !== analyser.frequencyBinCount) bins = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(bins);
			} else idle.t += .02;
			const row = ctx.createImageData(w, 2);
			const data = row.data;
			const count = bins.length;
			const span = Math.max(1, Math.floor(count * usable));
			for (let x = 0; x < w; x++) {
				const bin = Math.min(span - 1, Math.floor(x / w * span));
				let v = 0;
				if (analyser && active) {
					v = (bins[bin] ?? 0) / 255;
					v = Math.pow(v, 1.15);
				} else {
					const wave = .08 + .04 * Math.sin(idle.t + x * .02) + .03 * Math.sin(x * .11);
					v = Math.max(0, wave * .35);
				}
				const [r, g, b] = colorAt(v);
				for (let y = 0; y < 2; y++) {
					const i = (y * w + x) * 4;
					data[i] = r;
					data[i + 1] = g;
					data[i + 2] = b;
					data[i + 3] = 255;
				}
			}
			ctx.putImageData(row, 0, 0);
		};
		draw();
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	}, [analyser, active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden rounded-lg bg-background", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block size-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-3 py-2 font-mono text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0 kHz" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GibberLink band 1.9–6.4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8 kHz" })
			]
		})]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-paper shadow-instrument focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70" })]
}));
Slider.displayName = Slider$1.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("flex min-h-28 w-full rounded-md bg-secondary px-3 py-2.5 font-mono text-sm text-foreground shadow-instrument placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
Textarea.displayName = "Textarea";
var PRESETS = [
	{
		id: "handshake",
		label: "Handshake",
		hint: "Mode switch, as in the original demo",
		payload: "GIBBERLINK_MODE_ON"
	},
	{
		id: "ping",
		label: "Ping",
		hint: "Shortest useful burst",
		payload: "ping"
	},
	{
		id: "hotel",
		label: "Hotel book",
		hint: "Structured payload from the ElevenLabs demo",
		payload: JSON.stringify({
			action: "book",
			hotel: "Grand Budapest",
			guests: 2,
			check_in: "2025-04-12",
			nights: 3
		})
	},
	{
		id: "agent",
		label: "Agent ready",
		hint: "Caller announcing itself",
		payload: JSON.stringify({
			agent: "caller",
			status: "ready",
			proto: "ggwave/audible-fast"
		})
	},
	{
		id: "confirm",
		label: "Confirm",
		hint: "Receptionist ack",
		payload: JSON.stringify({
			ok: true,
			reservation: "GB-4412",
			room: "412"
		})
	}
];
function writeString(view, offset, value) {
	for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
}
function encodeWav(samples, sampleRate) {
	const n = samples.length;
	const buffer = /* @__PURE__ */ new ArrayBuffer(44 + n * 2);
	const view = new DataView(buffer);
	writeString(view, 0, "RIFF");
	view.setUint32(4, 36 + n * 2, true);
	writeString(view, 8, "WAVE");
	writeString(view, 12, "fmt ");
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, 1, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, sampleRate * 2, true);
	view.setUint16(32, 2, true);
	view.setUint16(34, 16, true);
	writeString(view, 36, "data");
	view.setUint32(40, n * 2, true);
	let offset = 44;
	for (let i = 0; i < n; i++) {
		const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
		view.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
		offset += 2;
	}
	return new Blob([buffer], { type: "audio/wav" });
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function TransmitPanel() {
	const payload = useDecoder((s) => s.payload);
	const setPayload = useDecoder((s) => s.setPayload);
	const protocol = useDecoder((s) => s.protocol);
	const setProtocol = useDecoder((s) => s.setProtocol);
	const volume = useDecoder((s) => s.volume);
	const setVolume = useDecoder((s) => s.setVolume);
	const dss = useDecoder((s) => s.dss);
	const setDss = useDecoder((s) => s.setDss);
	const transmitting = useDecoder((s) => s.transmitting);
	const setTransmitting = useDecoder((s) => s.setTransmitting);
	const addPacket = useDecoder((s) => s.addPacket);
	const setCodec = useDecoder((s) => s.setCodec);
	const meta = protocolByKey(protocol);
	const run = async (download) => {
		try {
			await engine.load();
			setCodec("ready");
			engine.setDss(dss);
			const encoded = engine.encode(payload, protocol, volume);
			const texts = engine.decodeSamples(encoded.samples);
			for (const text of texts) addPacket({
				text,
				source: "loopback"
			});
			if (download) {
				downloadBlob(encodeWav(encoded.samples, engine.sampleRate), "gibberlink.wav");
				return;
			}
			setTransmitting(true);
			await engine.playSamples(encoded.samples);
		} catch (error) {
			setCodec("error", error instanceof Error ? error.message : "Transmit failed.");
		} finally {
			setTransmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-sm leading-relaxed text-muted-foreground",
				children: "Encode a payload as a GibberLink burst, play it through the speakers, and decode it in software so you can confirm the round-trip without a second device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPayload(preset.payload),
					className: cn("h-9 rounded-full px-3 font-mono text-xs tracking-wide transition-[background-color,color,box-shadow] duration-150", payload === preset.payload ? "bg-accent text-accent-foreground" : "text-muted-foreground shadow-instrument hover:text-foreground"),
					children: preset.label
				}, preset.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "payload",
					className: "mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground",
					children: "Payload"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "payload",
					value: payload,
					maxLength: 140,
					onChange: (e) => setPayload(e.target.value),
					spellCheck: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1.5 font-mono text-xs tabular-nums text-muted-foreground",
					children: [payload.length, "/140 · ggwave payloads stay small on purpose"]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground",
					children: "Protocol"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-lg bg-secondary p-1",
					children: AUDIBLE_KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setProtocol(key),
						className: cn("h-9 flex-1 rounded-md text-sm font-medium transition-[background-color,color] duration-150", protocol === key ? "bg-card text-foreground shadow-instrument" : "text-muted-foreground hover:text-foreground"),
						children: protocolByKey(key).short
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "sr-only",
					htmlFor: "more-protocols",
					children: "More protocols"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "more-protocols",
					className: "mt-2 h-11 w-full rounded-md bg-secondary px-3 font-mono text-sm text-foreground shadow-instrument focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
					value: protocol,
					onChange: (e) => setProtocol(e.target.value),
					children: PROTOCOLS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: p.key,
						children: [
							p.label,
							" · ",
							p.rate,
							" · ",
							p.band
						]
					}, p.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: meta.hint
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Volume" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: volume
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: 5,
				max: 100,
				step: 1,
				value: [volume],
				onValueChange: (v) => setVolume(v[0] ?? 45),
				"aria-label": "Transmit volume"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 cursor-pointer items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: dss,
					onChange: (e) => {
						const next = e.target.checked;
						setDss(next);
						engine.setDss(next);
					},
					className: "size-4 accent-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Direct-sequence spread", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-muted-foreground",
					children: "Both ends must agree. Leave off to match the public GibberLink demo."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => run(false),
					disabled: transmitting || payload.trim().length === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), transmitting ? "Playing burst…" : "Play and decode"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => run(true),
					disabled: payload.trim().length === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download WAV"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-muted-foreground",
				children: [
					meta.label,
					", ",
					meta.rate,
					". A ",
					payload.length,
					"-byte payload is typically",
					" ",
					formatDuration(Math.max(800, payload.length * 90)),
					" on the air."
				]
			})
		]
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 w-full items-center gap-1 rounded-lg bg-secondary p-1", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 font-sans text-sm font-medium text-muted-foreground transition-[color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:opacity-40 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-instrument", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function DecoderApp() {
	const codec = useDecoder((s) => s.codec);
	const codecError = useDecoder((s) => s.codecError);
	const setCodec = useDecoder((s) => s.setCodec);
	const hydrate = useDecoder((s) => s.hydrate);
	const tab = useDecoder((s) => s.tab);
	const setTab = useDecoder((s) => s.setTab);
	const listening = useDecoder((s) => s.listening);
	const transmitting = useDecoder((s) => s.transmitting);
	const setListening = useDecoder((s) => s.setListening);
	const setLevel = useDecoder((s) => s.setLevel);
	const addPacket = useDecoder((s) => s.addPacket);
	const [analyser, setAnalyser] = (0, import_react.useState)(null);
	const [sampleRate, setSampleRate] = (0, import_react.useState)(48e3);
	(0, import_react.useEffect)(() => {
		hydrate();
		let cancelled = false;
		setCodec("loading");
		engine.load().then(() => {
			if (cancelled) return;
			setAnalyser(engine.analyser);
			setSampleRate(engine.sampleRate);
			setCodec("ready");
		}).catch((error) => {
			if (cancelled) return;
			setCodec("error", error instanceof Error ? error.message : "Codec failed to load.");
		});
		return () => {
			cancelled = true;
			engine.stopListen();
		};
	}, [hydrate, setCodec]);
	const toggleListen = async () => {
		if (listening) {
			engine.stopListen();
			setListening(false);
			return;
		}
		try {
			await engine.load();
			setAnalyser(engine.analyser);
			setSampleRate(engine.sampleRate);
			setCodec("ready");
			await engine.listen((packet) => addPacket(packet), (value) => setLevel(value));
			setListening(true);
		} catch (error) {
			setListening(false);
			const message = error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone permission was denied. Use Transmit or File instead." : error instanceof Error ? error.message : "Could not start the receiver.";
			setCodec("error", message);
		}
	};
	const live = listening || transmitting;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-accent",
							children: "Acoustic receiver"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-sans text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "GibberLink"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm text-muted-foreground",
							children: "Decoder · ggwave FSK"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: codec === "ready" ? "accent" : "outline",
								children: codec === "ready" ? "Codec ready" : codec === "loading" ? "Loading codec" : codec === "error" ? "Codec error" : "Idle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: listening ? "live" : "outline",
								className: "gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full bg-subtle", listening && "led-live bg-accent") }), listening ? "Live" : "Standby"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: listening ? "outline" : "accent",
								size: "sm",
								onClick: toggleListen,
								disabled: codec === "loading",
								children: [listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {}), listening ? "Stop" : "Listen"]
							})
						]
					})]
				}),
				codecError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive",
					children: codecError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "instrument rounded-2xl p-3 sm:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
							children: "Spectrum"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs tabular-nums text-muted-foreground",
							children: [sampleRate.toLocaleString(), " Hz · 0–8 kHz"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spectrogram, {
						analyser,
						active: live,
						className: "h-44 sm:h-56 lg:h-64"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 lg:grid-cols-3 lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "instrument rounded-xl p-4 sm:p-5 lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							value: tab,
							onValueChange: (value) => setTab(value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "listen",
										children: "Listen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "transmit",
										children: "Transmit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "file",
										children: "File"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "guide",
										children: "Guide"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "listen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListenPanel, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "transmit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransmitPanel, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "file",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePanel, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "guide",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePanel, {})
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 lg:sticky lg:top-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-h-72 flex-col lg:min-h-80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PacketLog, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})]
					})]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecoderApp, {});
}
//#endregion
export { Home as component };
