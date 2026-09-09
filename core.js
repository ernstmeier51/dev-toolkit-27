class UltraClicker {
  constructor() {
    this.running = false;
    this.interval = 1;
    this.target = null;
    this.lastTime = 0;
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.post = channel.port2;
    this.port.onmessage = () => this.execute();
  }

  mount(element, ms = 1) {
    this.target = element || document.body;
    this.interval = Math.max(0.1, ms);
    this.running = true;
    this.lastTime = performance.now();
    this.post.postMessage(null);
  }

  unmount() {
    this.running = false;
  }

  execute() {
    if (!this.running) return;
    const now = performance.now();
    const delta = now - this.lastTime;
    if (delta >= this.interval) {
      const clicksToDispatch = Math.min(100, Math.floor(delta / this.interval));
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      for (let i = 0; i < clicksToDispatch; i++) {
        this.target.dispatchEvent(event);
      }
      this.lastTime = now - (delta % this.interval);
    }
    if (this.running) {
      this.post.postMessage(null);
    }
  }
}
window.UltraClicker = UltraClicker;