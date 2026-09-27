import { create } from "zustand";
import type { CodecStatus, Packet, PacketSource, ProtocolKey } from "@/lib/ggwave/types";

const STORAGE_KEY = "gibberlink.packets.v1";
const MAX_PACKETS = 80;

type TabId = "listen" | "transmit" | "file" | "guide";

type DecoderState = {
  codec: CodecStatus;
  codecError: string | null;
  tab: TabId;
  listening: boolean;
  transmitting: boolean;
  level: number;
  protocol: ProtocolKey;
  volume: number;
  dss: boolean;
  payload: string;
  packets: Packet[];
  selectedId: string | null;
  fileName: string | null;
  fileProgress: number | null;
  setTab: (tab: TabId) => void;
  setCodec: (codec: CodecStatus, error?: string | null) => void;
  setListening: (listening: boolean) => void;
  setTransmitting: (transmitting: boolean) => void;
  setLevel: (level: number) => void;
  setProtocol: (protocol: ProtocolKey) => void;
  setVolume: (volume: number) => void;
  setDss: (dss: boolean) => void;
  setPayload: (payload: string) => void;
  setFile: (name: string | null, progress: number | null) => void;
  addPacket: (input: { text: string; bytes?: ArrayLike<number>; source: PacketSource }) => void;
  select: (id: string | null) => void;
  clear: () => void;
  hydrate: () => void;
};

function parseJson(text: string): unknown | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function toPacket(input: { text: string; bytes?: ArrayLike<number>; source: PacketSource }): Packet {
  const bytes = input.bytes
    ? Array.from(input.bytes)
    : Array.from(new TextEncoder().encode(input.text));
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    t: Date.now(),
    text: input.text,
    bytes,
    source: input.source,
    json: parseJson(input.text),
  };
}

function persist(packets: Packet[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packets.slice(0, MAX_PACKETS)));
  } catch {
    /* ignore quota */
  }
}

export const useDecoder = create<DecoderState>((set, get) => ({
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
  setCodec: (codec, error = null) => set({ codec, codecError: error }),
  setListening: (listening) => set({ listening, level: listening ? get().level : 0 }),
  setTransmitting: (transmitting) => set({ transmitting }),
  setLevel: (level) => set({ level }),
  setProtocol: (protocol) => set({ protocol }),
  setVolume: (volume) => set({ volume }),
  setDss: (dss) => set({ dss }),
  setPayload: (payload) => set({ payload }),
  setFile: (fileName, fileProgress) => set({ fileName, fileProgress }),
  addPacket: (input) => {
    const packet = toPacket(input);
    const packets = [packet, ...get().packets].slice(0, MAX_PACKETS);
    persist(packets);
    set({ packets, selectedId: packet.id });
  },
  select: (id) => set({ selectedId: id }),
  clear: () => {
    persist([]);
    set({ packets: [], selectedId: null });
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Packet[];
      if (!Array.isArray(parsed) || parsed.length === 0) return;
      set({
        packets: parsed.slice(0, MAX_PACKETS),
        selectedId: parsed[0]?.id ?? null,
      });
    } catch {
      /* ignore */
    }
  },
}));

export function selectedPacket(): Packet | undefined {
  const { packets, selectedId } = useDecoder.getState();
  return packets.find((p) => p.id === selectedId) ?? packets[0];
}
