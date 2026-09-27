class CaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = new Float32Array(1024);
    this.offset = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;

    let i = 0;
    while (i < channel.length) {
      const room = 1024 - this.offset;
      const take = Math.min(room, channel.length - i);
      this.buffer.set(channel.subarray(i, i + take), this.offset);
      this.offset += take;
      i += take;
      if (this.offset === 1024) {
        this.port.postMessage(this.buffer);
        this.buffer = new Float32Array(1024);
        this.offset = 0;
      }
    }
    return true;
  }
}

registerProcessor("capture-processor", CaptureProcessor);
