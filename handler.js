const AutoclickerHandler = {
  state: { active: false, clicks: 0, intervalId: null, targetSelector: null, clickInterval: 500, maxClicks: 100 },
  init(config) {
    this.state.targetSelector = config.selector || 'button';
    this.state.clickInterval = config.interval || 500;
    this.state.maxClicks = config.max || 100;
    this.setupCleanup();
  },
  setupCleanup() {
    window.addEventListener('beforeunload', () => this.stop());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state.active) this.pause();
      else if (!document.hidden && this.state.active) this.resume();
    });
  },
  start() {
    if (this.state.active) return;
    this.state.active = true;
    this.state.clicks = 0;
    this.state.intervalId = setInterval(() => this.performClick(), this.state.clickInterval);
  },
  performClick() {
    if (!this.state.active || this.state.clicks >= this.state.maxClicks) {
      this.stop();
      return;
    }
    const elements = document.querySelectorAll(this.state.targetSelector);
    if (elements.length > 0) {
      const randomIndex = Math.floor(Math.random() * elements.length);
      const element = elements[randomIndex];
      this.simulateClick(element);
      this.state.clicks++;
    }
  },
  simulateClick(element) {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    element.dispatchEvent(event);
  },
  pause() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.state.intervalId = null;
    }
  },
  resume() {
    if (this.state.active && !this.state.intervalId) {
      this.state.intervalId = setInterval(() => this.performClick(), this.state.clickInterval);
    }
  },
  stop() {
    this.state.active = false;
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.state.intervalId = null;
    }
    this.state.clicks = 0;
  },
  getStatus() {
    return { active: this.state.active, clicks: this.state.clicks, target: this.state.targetSelector };
  }
};