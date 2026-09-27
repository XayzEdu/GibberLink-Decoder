import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SpectrogramProps = {
  analyser: AnalyserNode | null;
  active: boolean;
  className?: string;
};

function colorAt(t: number): [number, number, number] {
  const stops: Array<[number, number, number, number]> = [
    [0, 12, 13, 12],
    [0.18, 28, 36, 30],
    [0.45, 90, 128, 104],
    [0.72, 138, 168, 146],
    [1, 238, 238, 232],
  ];
  const x = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < stops.length - 2 && x > (stops[i + 1]?.[0] ?? 1)) i += 1;
  const a = stops[i]!;
  const b = stops[i + 1]!;
  const span = b[0] - a[0] || 1;
  const u = (x - a[0]) / span;
  return [
    Math.round(a[1] + (b[1] - a[1]) * u),
    Math.round(a[2] + (b[2] - a[2]) * u),
    Math.round(a[3] + (b[3] - a[3]) * u),
  ];
}

export function Spectrogram({ analyser, active, className }: SpectrogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let bins = new Uint8Array(1024);
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

      const sampleRate = analyser?.context.sampleRate ?? 48000;
      const nyquist = sampleRate / 2;
      const maxHz = 8000;
      const usable = Math.min(1, maxHz / nyquist);

      if (analyser && active) {
        if (bins.length !== analyser.frequencyBinCount) {
          bins = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(bins);
      } else {
        idle.t += 0.02;
      }

      const row = ctx.createImageData(w, 2);
      const data = row.data;
      const count = bins.length;
      const span = Math.max(1, Math.floor(count * usable));

      for (let x = 0; x < w; x++) {
        const bin = Math.min(span - 1, Math.floor((x / w) * span));
        let v = 0;
        if (analyser && active) {
          v = (bins[bin] ?? 0) / 255;
          v = Math.pow(v, 1.15);
        } else {
          const wave =
            0.08 + 0.04 * Math.sin(idle.t + x * 0.02) + 0.03 * Math.sin(x * 0.11);
          v = Math.max(0, wave * 0.35);
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

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-background", className)}>
      <canvas ref={canvasRef} className="block size-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-3 py-2 font-mono text-xs text-muted-foreground">
        <span>0 kHz</span>
        <span className="hidden sm:inline">Band 1.9–6.4 kHz</span>
        <span>8 kHz</span>
      </div>
    </div>
  );
}
