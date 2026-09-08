const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const clickAt = (x, y) => {
  const el = document.elementFromPoint(x, y);
  if (el) {
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }));
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: x, clientY: y }));
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: x, clientY: y }));
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const queryAsync = (selector, timeout = 5000) => new Promise((resolve, reject) => {
  const start = Date.now();
  const check = () => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    if (Date.now() - start > timeout) return reject(new Error('timeout'));
    requestAnimationFrame(check);
  };
  check();
});

export { throttle, randomInt, clickAt, sleep, queryAsync };