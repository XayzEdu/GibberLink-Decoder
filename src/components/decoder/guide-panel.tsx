export function GuidePanel() {
  return (
    <div className="flex max-w-prose flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
      <p className="text-foreground">
        GibberLink is not a secret language. It is a 2025 ElevenLabs hackathon demo by Boris
        Starkov and Anton Pidkuiko: two voice agents start in English, notice they are both
        machines, and switch to ggwave — data-over-sound — instead of wasting tokens on speech.
      </p>
      <div>
        <h3 className="mb-2 font-medium text-foreground">What you are hearing</h3>
        <p>
          ggwave (Georgi Gerganov) paints a payload onto audible FSK tones, typically from 1.875 kHz
          with Reed-Solomon recovery. Bandwidth is only 8–16 bytes per second, so agents send
          compact JSON, not paragraphs. To a person it sounds like a short modem chirp. This
          decoder is a receiver for that chirp.
        </p>
      </div>
      <div>
        <h3 className="mb-2 font-medium text-foreground">How to use it</h3>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            On this device, open Transmit, pick a preset, and press Play and decode. The log should
            show the payload immediately — no microphone required.
          </li>
          <li>
            On a second phone or laptop, open this same app, start the receiver, then play a burst
            from the first device with the speakers facing the mic.
          </li>
          <li>
            Or drop a recording of a GibberLink exchange (or the original demo video’s audio) onto
            the File tab.
          </li>
        </ol>
      </div>
      <p>
        Ultrasound protocols sit near 15 kHz and often fail on laptop speakers. Stay on Audible Fast
        unless you know both ends can hear that high.
      </p>
    </div>
  );
}
