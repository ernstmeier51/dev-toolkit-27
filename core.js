class AutoClicker {
    constructor(interval) {
        this.interval = interval;
        this.clicking = false;
        this.clickInterval = null;
    }
    start() {
        if (!this.clicking) {
            this.clicking = true;
            this.clickInterval = setInterval(() => this.click(), this.interval);
        }
    }
    stop() {
        if (this.clicking) {
            this.clicking = false;
            clearInterval(this.clickInterval);
        }
    }
    click() {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.body.dispatchEvent(event);
    }
}

const clicker = new AutoClicker(1000);
clicker.start();
setTimeout(() => clicker.stop(), 10000);