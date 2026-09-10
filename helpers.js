const utils = {
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  clickElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
      const event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
      el.dispatchEvent(event);
    }
    return !!el;
  },
  jitter(base, variance) {
    return base + (Math.random() * variance * 2 - variance);
  },
  isElementVisible(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  retryAction: async (fn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === retries - 1) throw err;
        await utils.sleep(500 * (i + 1));
      }
    }
  }
};
export default utils;