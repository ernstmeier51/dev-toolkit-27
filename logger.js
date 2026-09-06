class RingBufferLogger {
  constructor(capacity = 64) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.errorCounts = new Map();
  }

  logError(error, context = {}) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    const hash = this._hash(message);

    const count = (this.errorCounts.get(hash) || 0) + 1;
    this.errorCounts.set(hash, count);

    if (count > 5 && count % 100 !== 0) {
      return;
    }

    const payload = {
      timestamp: Date.now(),
      message,
      source: stack.split('\n')[1]?.trim() || 'unknown source',
      repeats: count,
      ...context
    };

    this.buffer[this.head] = payload;
    this.head = (this.head + 1) % this.capacity;
    if (this.head === this.tail) {
      this.tail = (this.tail + 1) % this.capacity;
    }

    console.error(`[Autoclicker-Mitigator] (x${count}) ${message}`);
  }

  _hash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  }

  getRecentErrors() {
    const results = [];
    let current = this.tail;
    while (current !== this.head) {
      if (this.buffer[current]) results.push(this.buffer[current]);
      current = (current + 1) % this.capacity;
    }
    return results.reverse();
  }

  flush() {
    this.buffer.fill(null);
    this.head = 0;
    this.tail = 0;
    this.errorCounts.clear();
  }
}

export const logger = new RingBufferLogger();