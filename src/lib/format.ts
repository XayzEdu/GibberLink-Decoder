export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export function hexDump(bytes: number[]): string {
  const lines: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const slice = bytes.slice(i, i + 16);
    const hex = slice
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ")
      .padEnd(16 * 3 - 1, " ");
    const ascii = slice
      .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : "."))
      .join("");
    lines.push(`${i.toString(16).padStart(4, "0")}  ${hex}  ${ascii}`);
  }
  return lines.join("\n") || "—";
}

export function sourceLabel(source: string): string {
  switch (source) {
    case "live":
      return "Receiver";
    case "file":
      return "File";
    case "loopback":
      return "Transmit";
    case "self-test":
      return "Self-test";
    default:
      return source;
  }
}
