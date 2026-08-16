class AutoClicker {
    constructor(interval) {
        this.interval = interval;
    }

    startClicking() {
        this.validateInterval();
        this.clickInterval = setInterval(() => this.performClick(), this.interval);
    }

    performClick() {
        // Simulate a click event
        console.log('Click!');
    }

    validateInterval() {
        if (typeof this.interval !== 'number' || this.interval <= 0) {
            throw new Error('Invalid interval: must be a positive number.');
        }
    }

    stopClicking() {
        clearInterval(this.clickInterval);
    }
}

const clicker = new AutoClicker(1000);
clicker.startClicking();
setTimeout(() => clicker.stopClicking(), 5000);