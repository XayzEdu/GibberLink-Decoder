import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTime, sourceLabel } from "@/lib/format";
import { useDecoder } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PacketLog() {
  const packets = useDecoder((s) => s.packets);
  const selectedId = useDecoder((s) => s.selectedId);
  const select = useDecoder((s) => s.select);
  const clear = useDecoder((s) => s.clear);

  return (
    <section className="instrument flex min-h-0 flex-1 flex-col rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Log</p>
          <h2 className="text-lg font-medium tracking-tight">Packets</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          disabled={packets.length === 0}
          aria-label="Clear packet log"
        >
          <Trash2 />
          Clear
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {packets.length === 0 ? (
          <p className="max-w-prose text-sm text-muted-foreground">
            No packets yet. Start the receiver, transmit a burst, or drop an audio file.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {packets.map((packet) => {
              const selected = packet.id === selectedId;
              return (
                <li key={packet.id} className="packet-enter">
                  <button
                    type="button"
                    onClick={() => select(packet.id)}
                    className={cn(
                      "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-left transition-[background-color,box-shadow] duration-150",
                      selected ? "bg-secondary shadow-instrument" : "hover:bg-secondary/70",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {formatTime(packet.t)}
                      </span>
                      <Badge variant={packet.source === "live" ? "accent" : "default"}>
                        {sourceLabel(packet.source)}
                      </Badge>
                    </div>
                    <p className="truncate font-mono text-sm text-foreground">{packet.text}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
