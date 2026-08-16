class AutoClicker {
    constructor(interval) {
        this.interval = this.validateInterval(interval);
        this.clicking = false;
    }

    validateInterval(interval) {
        if (typeof interval !== 'number' || interval <= 0) {
            throw new Error('Invalid interval: Must be a positive number.');
        }
        return interval;
    }

    start() {
        if (this.clicking) return;
        this.clicking = true;
        this.clickLoop();
    }

    stop() {
        this.clicking = false;
    }

    clickLoop() {
        if (!this.clicking) return;
        this.simulateClick();
        setTimeout(() => this.clickLoop(), this.interval);
    }

    simulateClick() {
        console.log('Click simulated!');
    }
}

const clicker = new AutoClicker(1000);
clicker.start();
