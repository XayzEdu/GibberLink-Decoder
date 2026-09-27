import type { ProtocolKey } from "./types";

export type ProtocolMeta = {
  key: ProtocolKey;
  enumKey: string;
  label: string;
  short: string;
  group: "audible" | "ultrasound" | "dual-tone";
  rate: string;
  band: string;
  hint: string;
};

export const PROTOCOLS: ProtocolMeta[] = [
  {
    key: "AUDIBLE_NORMAL",
    enumKey: "GGWAVE_PROTOCOL_AUDIBLE_NORMAL",
    label: "Audible Normal",
    short: "Normal",
    group: "audible",
    rate: "~8 B/s",
    band: "1.9–6.4 kHz",
    hint: "Slowest, most robust over noisy speakers",
  },
  {
    key: "AUDIBLE_FAST",
    enumKey: "GGWAVE_PROTOCOL_AUDIBLE_FAST",
    label: "Audible Fast",
    short: "Fast",
    group: "audible",
    rate: "~12 B/s",
    band: "1.9–6.4 kHz",
    hint: "GibberLink default — the viral hotel-booking burst",
  },
  {
    key: "AUDIBLE_FASTEST",
    enumKey: "GGWAVE_PROTOCOL_AUDIBLE_FASTEST",
    label: "Audible Fastest",
    short: "Fastest",
    group: "audible",
    rate: "~16 B/s",
    band: "1.9–6.4 kHz",
    hint: "Shortest tones; needs a clean acoustic path",
  },
  {
    key: "ULTRASOUND_NORMAL",
    enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_NORMAL",
    label: "Ultrasound Normal",
    short: "[U] Normal",
    group: "ultrasound",
    rate: "~8 B/s",
    band: "15–19 kHz",
    hint: "Near the edge of hearing; many laptop speakers roll off",
  },
  {
    key: "ULTRASOUND_FAST",
    enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_FAST",
    label: "Ultrasound Fast",
    short: "[U] Fast",
    group: "ultrasound",
    rate: "~12 B/s",
    band: "15–19 kHz",
    hint: "Quiet to most people; hit-or-miss on phone mics",
  },
  {
    key: "ULTRASOUND_FASTEST",
    enumKey: "GGWAVE_PROTOCOL_ULTRASOUND_FASTEST",
    label: "Ultrasound Fastest",
    short: "[U] Fastest",
    group: "ultrasound",
    rate: "~16 B/s",
    band: "15–19 kHz",
    hint: "Fastest ultrasonic; easiest to miss",
  },
  {
    key: "DT_NORMAL",
    enumKey: "GGWAVE_PROTOCOL_DT_NORMAL",
    label: "Dual-tone Normal",
    short: "[DT] Normal",
    group: "dual-tone",
    rate: "~3 B/s",
    band: "narrow FSK",
    hint: "Two tones per symbol, slower and distinct",
  },
  {
    key: "DT_FAST",
    enumKey: "GGWAVE_PROTOCOL_DT_FAST",
    label: "Dual-tone Fast",
    short: "[DT] Fast",
    group: "dual-tone",
    rate: "~6 B/s",
    band: "narrow FSK",
    hint: "Dual-tone middle speed",
  },
  {
    key: "DT_FASTEST",
    enumKey: "GGWAVE_PROTOCOL_DT_FASTEST",
    label: "Dual-tone Fastest",
    short: "[DT] Fastest",
    group: "dual-tone",
    rate: "~9 B/s",
    band: "narrow FSK",
    hint: "Dual-tone, shortest frames",
  },
];

export const AUDIBLE_KEYS: ProtocolKey[] = [
  "AUDIBLE_NORMAL",
  "AUDIBLE_FAST",
  "AUDIBLE_FASTEST",
];

export function protocolByKey(key: ProtocolKey): ProtocolMeta {
  const found = PROTOCOLS.find((p) => p.key === key);
  if (!found) return PROTOCOLS[1]!;
  return found;
}
