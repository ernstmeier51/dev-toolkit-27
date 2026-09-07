const memoizeClickCoordinates = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    if (cache.size > 100) cache.delete(cache.keys().next().value);
    return result;
  };
};

const fastEventDispatcher = {
  queue: [],
  flush() {
    while (this.queue.length) {
      const event = this.queue.shift();
      document.elementFromPoint(event.x, event.y)?.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: event.x,
        clientY: event.y
      }));
    }
  },
  schedule(x, y) {
    this.queue.push({ x, y });
    requestAnimationFrame(() => this.flush());
  }
};

export { memoizeClickCoordinates, fastEventDispatcher };