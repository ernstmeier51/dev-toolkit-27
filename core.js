class AutoClicker {
    constructor(target, interval) {
        this.target = target;
        this.interval = interval;
        this.clickInterval = null;
    }
    start() {
        if (this.clickInterval) return;
        this.clickInterval = setInterval(() => {
            this.target.click();
        }, this.interval);
    }
    stop() {
        clearInterval(this.clickInterval);
        this.clickInterval = null;
    }
    updateInterval(newInterval) {
        this.stop();
        this.interval = newInterval;
        this.start();
    }
    getStatus() {
        return this.clickInterval ? 'Running' : 'Stopped';
    }
}

function initializeAutoClicker(targetSelector, interval) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
        throw new Error('Target element not found');
    }
    return new AutoClicker(targetElement, interval);
}