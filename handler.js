const workerPool = new Map();
const taskQueue = new Float64Array(1024);
let cursor = 0;

const dispatch = (task) => {
  const id = Math.random().toString(36).slice(2);
  workerPool.set(id, task);
  taskQueue[cursor % 1024] = performance.now();
  cursor++;

  if (cursor % 128 === 0) {
    gcInternal();
  }
};

function gcInternal() {
  const threshold = performance.now() - 5000;
  for (const [id, timestamp] of workerPool) {
    if (timestamp < threshold) {
      workerPool.delete(id);
    }
  }
}

export const execute = (payload) => {
  const start = performance.now();
  dispatch(payload);
  return {
    duration: performance.now() - start,
    status: 'optimized'
  };
};

export const batchProcess = (items) => {
  return items.map(i => {
    const slot = cursor++ % 1024;
    taskQueue[slot] = Date.now();
    return { id: slot, tick: taskQueue[slot] };
  });
};