class AutoClicker {
    constructor(interval) {
        this.interval = interval;
        this.isActive = false;
    }

    validateInput(value) {
        return typeof value === 'number' && value > 0;
    }

    start() {
        if (!this.validateInput(this.interval)) {
            console.error('Invalid interval. Must be a positive number.');
            return;
        }
        this.isActive = true;
        this.run();
    }

    stop() {
        this.isActive = false;
    }

    run() {
        if (!this.isActive) return;
        console.log('Click!'); // Simulated click
        setTimeout(() => this.run(), this.interval);
    }
}

const clicker = new AutoClicker(1000);
clicker.start();
setTimeout(() => clicker.stop(), 5000);