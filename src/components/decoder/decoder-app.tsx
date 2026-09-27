import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import { FilePanel } from "@/components/decoder/file-panel";
import { GuidePanel } from "@/components/decoder/guide-panel";
import { Inspector } from "@/components/decoder/inspector";
import { ListenPanel } from "@/components/decoder/listen-panel";
import { PacketLog } from "@/components/decoder/packet-log";
import { Spectrogram } from "@/components/decoder/spectrogram";
import { TransmitPanel } from "@/components/decoder/transmit-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { engine } from "@/lib/ggwave/engine";
import { useDecoder } from "@/lib/store";
import { cn } from "@/lib/utils";

export function DecoderApp() {
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
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [sampleRate, setSampleRate] = useState(48000);

  useEffect(() => {
    hydrate();
    let cancelled = false;
    setCodec("loading");
    engine
      .load()
      .then(() => {
        if (cancelled) return;
        setAnalyser(engine.analyser);
        setSampleRate(engine.sampleRate);
        setCodec("ready");
      })
      .catch((error: unknown) => {
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

  const live = listening || transmitting;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Acoustic receiver
            </p>
            <h1 className="mt-1 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
              GibberLink
            </h1>
            <p className="mt-1 font-mono text-sm text-muted-foreground">Decoder · ggwave FSK</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={codec === "ready" ? "accent" : "outline"}>
              {codec === "ready"
                ? "Codec ready"
                : codec === "loading"
                  ? "Loading codec"
                  : codec === "error"
                    ? "Codec error"
                    : "Idle"}
            </Badge>
            <Badge variant={listening ? "live" : "outline"} className="gap-1.5">
              <span
                className={cn("size-1.5 rounded-full bg-subtle", listening && "led-live bg-accent")}
              />
              {listening ? "Live" : "Standby"}
            </Badge>
            <Button
              variant={listening ? "outline" : "accent"}
              size="sm"
              onClick={toggleListen}
              disabled={codec === "loading"}
            >
              {listening ? <MicOff /> : <Mic />}
              {listening ? "Stop" : "Listen"}
            </Button>
          </div>
        </header>

        {codecError ? (
          <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {codecError}
          </p>
        ) : null}

        <section className="instrument rounded-2xl p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Spectrum
            </p>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              {sampleRate.toLocaleString()} Hz · 0–8 kHz
            </p>
          </div>
          <Spectrogram analyser={analyser} active={live} className="h-44 sm:h-56 lg:h-64" />
        </section>

        <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
          <section className="instrument rounded-xl p-4 sm:p-5 lg:col-span-2">
            <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
              <TabsList>
                <TabsTrigger value="listen">Listen</TabsTrigger>
                <TabsTrigger value="transmit">Transmit</TabsTrigger>
                <TabsTrigger value="file">File</TabsTrigger>
                <TabsTrigger value="guide">Guide</TabsTrigger>
              </TabsList>
              <TabsContent value="listen">
                <ListenPanel />
              </TabsContent>
              <TabsContent value="transmit">
                <TransmitPanel />
              </TabsContent>
              <TabsContent value="file">
                <FilePanel />
              </TabsContent>
              <TabsContent value="guide">
                <GuidePanel />
              </TabsContent>
            </Tabs>
          </section>

          <div className="flex flex-col gap-5 lg:col-span-1 lg:sticky lg:top-6">
            <div className="flex min-h-72 flex-col lg:min-h-80">
              <PacketLog />
            </div>
            <Inspector />
          </div>
        </div>
      </div>
    </div>
  );
}
