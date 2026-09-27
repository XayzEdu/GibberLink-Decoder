export type Preset = {
  id: string;
  label: string;
  hint: string;
  payload: string;
};

export const PRESETS: Preset[] = [
  {
    id: "handshake",
    label: "Handshake",
    hint: "Mode switch, as in the original demo",
    payload: "GIBBERLINK_MODE_ON",
  },
  {
    id: "ping",
    label: "Ping",
    hint: "Shortest useful burst",
    payload: "ping",
  },
  {
    id: "hotel",
    label: "Hotel book",
    hint: "Structured payload from the ElevenLabs demo",
    payload: JSON.stringify({
      action: "book",
      hotel: "Grand Budapest",
      guests: 2,
      check_in: "2025-04-12",
      nights: 3,
    }),
  },
  {
    id: "agent",
    label: "Agent ready",
    hint: "Caller announcing itself",
    payload: JSON.stringify({
      agent: "caller",
      status: "ready",
      proto: "ggwave/audible-fast",
    }),
  },
  {
    id: "confirm",
    label: "Confirm",
    hint: "Receptionist ack",
    payload: JSON.stringify({
      ok: true,
      reservation: "GB-4412",
      room: "412",
    }),
  },
];
