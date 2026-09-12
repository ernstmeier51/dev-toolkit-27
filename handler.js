const clickEngine = {
  intervalIds: new Map(),
  createClicker: (selector, delay) => {
    const target = document.querySelector(selector);
    if (!target) return null;
    const id = setInterval(() => target.dispatchEvent(new MouseEvent('click', { bubbles: true })), delay);
    clickEngine.intervalIds.set(selector, id);
    return id;
  },
  stopClicker: (selector) => {
    clearInterval(clickEngine.intervalIds.get(selector));
    clickEngine.intervalIds.delete(selector);
  },
  asyncSequential: async (tasks, interval) => {
    for (const task of tasks) {
      task();
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  },
  observeChanges: (selector, callback) => {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) if (m.target.matches(selector)) callback(m);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
  }
};
export default clickEngine;