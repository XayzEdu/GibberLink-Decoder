import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { engine } from "@/lib/ggwave/engine";
import { useDecoder } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FilePanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const fileName = useDecoder((s) => s.fileName);
  const progress = useDecoder((s) => s.fileProgress);
  const setFile = useDecoder((s) => s.setFile);
  const addPacket = useDecoder((s) => s.addPacket);
  const setCodec = useDecoder((s) => s.setCodec);
  const [message, setMessage] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setMessage(null);
    setFile(file.name, 0);
    try {
      await engine.load();
      setCodec("ready");
      const ctx = await engine.ensureAudio();
      const bytes = await file.arrayBuffer();
      setFile(file.name, 0.4);
      const audio = await ctx.decodeAudioData(bytes.slice(0));
      setFile(file.name, 0.7);
      const texts = engine.decodeAudioBuffer(audio);
      if (texts.length === 0) {
        setMessage("No GibberLink frames found in that file.");
      } else {
        for (const text of texts) {
          addPacket({ text, source: "file" });
        }
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

  return (
    <div className="flex flex-col gap-5">
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
        Drop a WAV, MP3, or other audio clip — including a recording of two agents in GibberLink
        mode. The decoder walks the file in 1024-sample frames, the same path used for live audio.
      </p>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          void handleFile(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex min-h-36 flex-col items-center justify-center gap-3 rounded-lg bg-secondary px-4 py-8 text-center shadow-instrument transition-[box-shadow] duration-150",
          drag && "shadow-instrument-hover",
        )}
      >
        <Upload className="size-5 text-muted-foreground" />
        <p className="text-sm text-foreground">Drop audio here</p>
        <p className="font-mono text-xs text-muted-foreground">WAV · MP3 · OGG · M4A · FLAC</p>
        <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          Choose file
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,video/webm,video/mp4,.wav,.mp3,.ogg,.m4a,.flac"
          className="sr-only"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {fileName ? (
        <p className="font-mono text-xs text-muted-foreground">
          {fileName}
          {progress != null ? ` · ${Math.round(progress * 100)}%` : null}
        </p>
      ) : null}
      {message ? <p className="text-sm text-foreground">{message}</p> : null}
    </div>
  );
}
