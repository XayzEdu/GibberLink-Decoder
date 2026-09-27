import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { engine } from "@/lib/ggwave/engine";
import { useDecoder } from "@/lib/store";

export function ListenPanel() {
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
      await engine.listen(
        (packet) => addPacket(packet),
        (value) => setLevel(value),
      );
      setListening(true);
    } catch (error) {
      setListening(false);
      const message =
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Microphone permission was denied. Use Transmit or File instead."
          : error instanceof Error
            ? error.message
            : "Could not start the receiver.";
      setCodec("error", message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
        Open the microphone and decode GibberLink / ggwave bursts in real time. Best with a second
        device transmitting, or play a recording next to this one.
      </p>
      <Button
        variant={listening ? "outline" : "accent"}
        onClick={toggle}
        disabled={codec === "loading"}
        className="w-full sm:w-auto"
      >
        {listening ? <MicOff /> : <Mic />}
        {listening ? "Stop receiver" : "Start receiver"}
      </Button>
      <div>
        <div className="mb-1.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span>Input level</span>
          <span className="tabular-nums">{Math.round(level * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-100"
            style={{ width: `${Math.round(level * 100)}%` }}
          />
        </div>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Echo cancellation is off so FSK tones survive the capture path.</li>
        <li>Identical payloads within 1.6 s are folded into one packet.</li>
        <li>If the preview blocks the mic, transmit a burst on this page — it decodes itself.</li>
      </ul>
    </div>
  );
}
