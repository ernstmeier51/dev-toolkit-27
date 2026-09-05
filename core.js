const throttle = (fn, wait) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > wait) {
      last = now;
      fn(...args);
    }
  };
};

const pool = new Float64Array(1024);
let pointer = 0;

const performClick = (x, y) => {
  pool[pointer % 1024] = x;
  pool[(pointer + 1) % 1024] = y;
  pointer += 2;
  
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y
  });
  document.elementFromPoint(x, y)?.dispatchEvent(event);
};

const fastClick = throttle(performClick, 16);

export const core = {
  trigger: (x, y) => fastClick(x, y),
  history: pool,
  reset: () => { pointer = 0; pool.fill(0); }
};