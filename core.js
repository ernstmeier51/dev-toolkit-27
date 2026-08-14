// AutoClicker class that manages click events
class AutoClicker {
  /**
   * Creates an instance of AutoClicker.
   * @param {number} interval - The interval in milliseconds between clicks.
   */
  constructor(interval) {
    this.interval = interval;
    this.clickInterval = null;
  }

  /**
   * Starts the autoclicking process.
   */
  start() {
    if (!this.clickInterval) {
      this.clickInterval = setInterval(() => this.performClick(), this.interval);
    }
  }

  /**
   * Stops the autoclicking process.
   */
  stop() {
    clearInterval(this.clickInterval);
    this.clickInterval = null;
  }

  /**
   * Simulates a click event at the current cursor location.
   */
  performClick() {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    document.dispatchEvent(event);
  }
}

// Example usage
const clicker = new AutoClicker(1000);
clicker.start();

// To stop autoclicking, call clicker.stop();