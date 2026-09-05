const jitter = (base, percent = 15) => {
  const variation = base * (percent / 100);
  return base + (Math.random() * variation * 2 - variation);
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const clickSimulator = {
  async dispatchHumanLike(element, opts = {}) {
    if (!element) return false;
    const targetOpts = { bubbles: true, cancelable: true, view: window, ...opts };
    
    element.dispatchEvent(new MouseEvent('mousedown', targetOpts));
    await wait(jitter(45, 30)); 
    
    element.dispatchEvent(new MouseEvent('mouseup', targetOpts));
    element.click();
    return true;
  },

  *delayGenerator(baseInterval, limit = Infinity) {
    let count = 0;
    while (count < limit) {
      yield jitter(baseInterval, 25);
      count++;
    }
  },

  async runSequence(element, interval, durationMs) {
    const startTime = Date.now();
    const delays = this.delayGenerator(interval);
    
    for (const delay of delays) {
      if (Date.now() - startTime >= durationMs) break;
      await wait(delay);
      await this.dispatchHumanLike(element);
    }
  }
};

export const elementFinder = new Proxy({}, {
  get(_, prop) {
    return (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return {
        element,
        click: () => clickSimulator.dispatchHumanLike(element)
      };
    };
  }
});