import { Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { engine } from "@/lib/ggwave/engine";
import { formatDuration } from "@/lib/format";
import { AUDIBLE_KEYS, PROTOCOLS, protocolByKey } from "@/lib/ggwave/protocols";
import { PRESETS } from "@/lib/ggwave/presets";
import { downloadBlob, encodeWav } from "@/lib/ggwave/wav";
import { useDecoder } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TransmitPanel() {
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

  const run = async (download: boolean) => {
    try {
      await engine.load();
      setCodec("ready");
      engine.setDss(dss);
      const encoded = engine.encode(payload, protocol, volume);
      const texts = engine.decodeSamples(encoded.samples);
      for (const text of texts) {
        addPacket({ text, source: "loopback" });
      }
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

  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
        Encode a payload as a GibberLink burst, play it through the speakers, and decode it in
        software so you can confirm the round-trip without a second device.
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setPayload(preset.payload)}
            className={cn(
              "h-9 rounded-full px-3 font-mono text-xs tracking-wide transition-[background-color,color,box-shadow] duration-150",
              payload === preset.payload
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground shadow-instrument hover:text-foreground",
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div>
        <label
          htmlFor="payload"
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          Payload
        </label>
        <Textarea
          id="payload"
          value={payload}
          maxLength={140}
          onChange={(e) => setPayload(e.target.value)}
          spellCheck={false}
        />
        <p className="mt-1.5 font-mono text-xs tabular-nums text-muted-foreground">
          {payload.length}/140 · ggwave payloads stay small on purpose
        </p>
      </div>
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Protocol
        </p>
        <div className="flex rounded-lg bg-secondary p-1">
          {AUDIBLE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setProtocol(key)}
              className={cn(
                "h-9 flex-1 rounded-md text-sm font-medium transition-[background-color,color] duration-150",
                protocol === key
                  ? "bg-card text-foreground shadow-instrument"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {protocolByKey(key).short}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="more-protocols">
          More protocols
        </label>
        <select
          id="more-protocols"
          className="mt-2 h-11 w-full rounded-md bg-secondary px-3 font-mono text-sm text-foreground shadow-instrument focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value as typeof protocol)}
        >
          {PROTOCOLS.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label} · {p.rate} · {p.band}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-muted-foreground">{meta.hint}</p>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>Volume</span>
          <span className="tabular-nums">{volume}</span>
        </div>
        <Slider
          min={5}
          max={100}
          step={1}
          value={[volume]}
          onValueChange={(v) => setVolume(v[0] ?? 45)}
          aria-label="Transmit volume"
        />
      </div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={dss}
          onChange={(e) => {
            const next = e.target.checked;
            setDss(next);
            engine.setDss(next);
          }}
          className="size-4 accent-accent"
        />
        <span>
          Direct-sequence spread
          <span className="block text-muted-foreground">
            Both ends must agree. Leave off to match the public GibberLink demo.
          </span>
        </span>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={() => run(false)} disabled={transmitting || payload.trim().length === 0}>
          <Play />
          {transmitting ? "Playing burst…" : "Play and decode"}
        </Button>
        <Button variant="outline" onClick={() => run(true)} disabled={payload.trim().length === 0}>
          <Download />
          Download WAV
        </Button>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {meta.label}, {meta.rate}. A {payload.length}-byte payload is typically{" "}
        {formatDuration(Math.max(800, payload.length * 90))} on the air.
      </p>
    </div>
  );
}
