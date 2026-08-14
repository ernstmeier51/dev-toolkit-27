class AutoClicker {
    constructor(interval) {
        this.interval = interval;
        this.clicking = false;
        this.clickId = null;
    }

    start() {
        if (this.clicking) return;
        this.clicking = true;
        this.clickId = setInterval(() => this.triggerClick(), this.interval);
    }

    stop() {
        if (!this.clicking) return;
        clearInterval(this.clickId);
        this.clicking = false;
        this.clickId = null;
    }

    triggerClick() {
        const event = new MouseEvent('click', { bubbles: true });
        document.dispatchEvent(event);
    }
}

const clicker = new AutoClicker(1000);
clicker.start();

// Stop clicking after 10 seconds
setTimeout(() => clicker.stop(), 10000);