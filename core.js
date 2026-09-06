const executionStack = new Set();
const workerPool = Array.from({ length: 4 }, () => new Worker('data:text/javascript,self.onmessage=e=>{postMessage(e.data())}'));
let cursor = 0;

const throttleRegistry = {
  limit: 1000 / 60,
  lastRun: 0,
  schedule: (task) => {
    const now = performance.now();
    if (now - throttleRegistry.lastRun > throttleRegistry.limit) {
      throttleRegistry.lastRun = now;
      return task();
    }
    return Promise.resolve(null);
  }
};

const dispatchClick = (coords) => {
  const worker = workerPool[cursor++ % workerPool.length];
  worker.postMessage(() => document.elementFromPoint(coords.x, coords.y)?.click());
};

export const runAutoclicker = (coords) => {
  throttleRegistry.schedule(() => {
    if (!executionStack.has(coords)) {
      executionStack.add(coords);
      dispatchClick(coords);
      setTimeout(() => executionStack.delete(coords), 16);
    }
  });
};

export const flushStack = () => executionStack.clear();