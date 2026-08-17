class AutoClicker {
    constructor(interval) {
        this.interval = interval;
        this.clicks = [];
        this.isActive = false;
    }

    start() {
        this.isActive = true;
        this.run();
    }

    stop() {
        this.isActive = false;
        clearTimeout(this.timeout);
    }

    async run() {
        while (this.isActive) {
            this.click();
            await this.delay(this.interval);
        }
    }

    click() {
        const clickEvent = new MouseEvent('click');
        document.dispatchEvent(clickEvent);
        this.clicks.push(Date.now());
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const autoClicker = new AutoClicker(1000);

window.addEventListener('load', () => {
    autoClicker.start();
});