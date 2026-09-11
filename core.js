const serializeClickData = (clickEvents) => {
  const buffer = new ArrayBuffer(clickEvents.length * 8);
  const view = new Float64Array(buffer);
  clickEvents.forEach((event, i) => {
    view[i] = Date.now() + event.delay;
  });
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const deserializeClickData = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Float64Array(bytes.buffer);
};

const streamController = {
  queue: [],
  flush(target) {
    const batch = this.queue.splice(0, this.queue.length);
    return batch.reduce((acc, task) => {
      const element = document.elementFromPoint(task.x, task.y);
      if (element) {
        element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        acc.push({ timestamp: Date.now(), success: true });
      }
      return acc;
    }, []);
  }
};

export { serializeClickData, deserializeClickData, streamController };