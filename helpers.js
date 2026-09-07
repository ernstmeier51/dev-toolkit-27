const clickInterval = (target, delay, active) => {
  let timer = null;
  const pulse = () => {
    if (active.get()) {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      timer = setTimeout(pulse, delay);
    }
  };
  return { start: () => !timer && pulse(), stop: () => clearTimeout(timer) };
};

const sanitizeNode = (node) => (node instanceof HTMLElement ? node : document.body);

const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

const createToggleState = (initial = false) => {
  let state = initial;
  return { get: () => state, flip: () => { state = !state; return state; } };
};

export { clickInterval, sanitizeNode, debounce, createToggleState };