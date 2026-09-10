/**
 * Quantized Click Sequence Streamer & Delta Processor
 * Handles high-frequency autoclick coordinates and interval jitter encoding.
 */

class ClickDataBuffer {
  #buffer;
  #scale;

  constructor(precisionScale = 100) {
    this.#buffer = [];
    this.#scale = precisionScale;
  }

  /**
   * Pushes a click payload into a temporal delta-compressed state.
   */
  pushClick(x, y, delayMs) {
    const quantizedX = Math.round(x * this.#scale);
    const quantizedY = Math.round(y * this.#scale);
    const last = this.#buffer[this.#buffer.length - 1] || { rawX: 0, rawY: 0 };

    const deltaEntry = {
      dx: quantizedX - last.rawX,
      dy: quantizedY - last.rawY,
      delay: Math.max(1, Math.round(delayMs)),
      rawX: quantizedX,
      rawY: quantizedY,
      t: Date.now()
    };

    this.#buffer.push(deltaEntry);
    return this.#buffer.length;
  }

  /**
   * Generator that yields reconstructed absolute click coordinates with simulated human jitter.
   */
  *streamReconstruction(jitterFactor = 0.05) {
    let currentX = 0;
    let currentY = 0;

    for (const delta of this.#buffer) {
      currentX += delta.dx;
      currentY += delta.dy;

      const noiseX = (Math.random() - 0.5) * 2 * jitterFactor;
      const noiseY = (Math.random() - 0.5) * 2 * jitterFactor;

      yield {
        x: Number(((currentX / this.#scale) + noiseX).toFixed(2)),
        y: Number(((currentY / this.#scale) + noiseY).toFixed(2)),
        delay: Math.round(delta.delay * (1 + (Math.random() - 0.5) * jitterFactor))
      };
    }
  }

  flush() {
    const dataCopy = [...this.#buffer];
    this.#buffer = [];
    return dataCopy;
  }
}

module.exports = { ClickDataBuffer };