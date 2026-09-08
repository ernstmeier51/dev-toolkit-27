const randomNormal = (mean, stdDev) => {
  const u1 = 1 - Math.random();
  const u2 = 1 - Math.random();
  const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  return mean + stdDev * randStdNormal;
};

export const sleep = (ms, jitter = 0.15) => {
  const duration = randomNormal(ms, ms * jitter);
  return new Promise(resolve => setTimeout(resolve, Math.max(1, duration)));
};

export const triggerHumanClick = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const x = randomNormal(rect.left + rect.width / 2, rect.width / 6);
  const y = randomNormal(rect.top + rect.height / 2, rect.height / 6);

  const events = ['mousedown', 'mouseup', 'click'].map(type =>
    new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: Math.max(rect.left, Math.min(rect.right, x)),
      clientY: Math.max(rect.top, Math.min(rect.bottom, y))
    })
  );

  events.forEach(evt => element.dispatchEvent(evt));
  return true;
};

export const finder = new Proxy({}, {
  get: (_, prop) => {
    const query = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
    return (context = document) => {
      let el = context.querySelector(query) || context.querySelector(`.${query}`) || context.querySelector(`#${query}`);
      if (!el) {
        el = Array.from(context.querySelectorAll('button, a, div'))
          .find(node => node.textContent.trim().toLowerCase().includes(query.replace(/-/g, ' ')));
      }
      return el;
    };
  }
});