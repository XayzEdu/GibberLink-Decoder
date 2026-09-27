import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { hexDump, sourceLabel } from "@/lib/format";
import { useDecoder } from "@/lib/store";

export function Inspector() {
  const packets = useDecoder((s) => s.packets);
  const selectedId = useDecoder((s) => s.selectedId);
  const packet = packets.find((p) => p.id === selectedId) ?? packets[0];
  const [copied, setCopied] = useState<"text" | "hex" | null>(null);

  const copy = async (kind: "text" | "hex", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  if (!packet) {
    return (
      <section className="instrument rounded-xl p-4">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Inspector</p>
        <h2 className="mt-1 text-lg font-medium tracking-tight">Payload</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Select a packet to inspect UTF-8, JSON, and hex.
        </p>
      </section>
    );
  }

  const hex = hexDump(packet.bytes);

  return (
    <section className="instrument flex min-h-0 flex-col rounded-xl p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Inspector · {sourceLabel(packet.source)}
          </p>
          <h2 className="text-lg font-medium tracking-tight">Payload</h2>
        </div>
        <p className="font-mono text-xs tabular-nums text-muted-foreground">{packet.bytes.length} B</p>
      </div>
      <div className="flex min-h-0 flex-col gap-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">UTF-8</p>
            <Button variant="ghost" size="sm" onClick={() => copy("text", packet.text)}>
              {copied === "text" ? <Check /> : <Copy />}
              Copy
            </Button>
          </div>
          <pre className="max-h-28 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-foreground">
            {packet.text}
          </pre>
        </div>
        {packet.json != null ? (
          <div>
            <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              JSON
            </p>
            <pre className="max-h-36 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-accent">
              {JSON.stringify(packet.json, null, 2)}
            </pre>
          </div>
        ) : null}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Hex</p>
            <Button variant="ghost" size="sm" onClick={() => copy("hex", hex)}>
              {copied === "hex" ? <Check /> : <Copy />}
              Copy
            </Button>
          </div>
          <pre className="max-h-32 overflow-auto rounded-md bg-background px-3 py-2 font-mono text-xs leading-relaxed text-muted-foreground">
            {hex}
          </pre>
        </div>
      </div>
    </section>
  );
}
