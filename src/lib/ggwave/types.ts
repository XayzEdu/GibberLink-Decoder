export type GgwaveEnum = { value: number };

export type GgwaveParams = {
  payloadLength: number;
  sampleRateInp: number;
  sampleRateOut: number;
  sampleRate: number;
  samplesPerFrame: number;
  soundMarkerThreshold: number;
  sampleFormatInp: GgwaveEnum;
  sampleFormatOut: GgwaveEnum;
  operatingMode: number;
};

export type GgwaveModule = {
  ProtocolId: Record<string, GgwaveEnum> & {
    values: Record<number, GgwaveEnum>;
  };
  SampleFormat: Record<string, GgwaveEnum>;
  GGWAVE_OPERATING_MODE_RX: number;
  GGWAVE_OPERATING_MODE_TX: number;
  GGWAVE_OPERATING_MODE_RX_AND_TX: number;
  GGWAVE_OPERATING_MODE_USE_DSS: number;
  getDefaultParameters: () => GgwaveParams;
  init: (params: GgwaveParams) => number;
  free: (instance: number) => void;
  encode: (
    instance: number,
    payload: string,
    protocolId: GgwaveEnum,
    volume: number,
  ) => Int8Array;
  decode: (instance: number, data: Int8Array) => Int8Array;
  disableLog: () => void;
  rxToggleProtocol: (id: GgwaveEnum, state: number) => void;
};

export type ProtocolKey =
  | "AUDIBLE_NORMAL"
  | "AUDIBLE_FAST"
  | "AUDIBLE_FASTEST"
  | "ULTRASOUND_NORMAL"
  | "ULTRASOUND_FAST"
  | "ULTRASOUND_FASTEST"
  | "DT_NORMAL"
  | "DT_FAST"
  | "DT_FASTEST";

export type PacketSource = "live" | "file" | "loopback" | "self-test";

export type Packet = {
  id: string;
  t: number;
  text: string;
  bytes: number[];
  source: PacketSource;
  json: unknown | null;
};

export type CodecStatus = "idle" | "loading" | "ready" | "error";
