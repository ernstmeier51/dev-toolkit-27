// @ts-check

/**
 * Class representing an autoclicker handler.
 */
class AutoClickerHandler {
    /**
     * Create an autoclicker handler.
     * @param {number} interval - The interval between clicks in milliseconds.
     */
    constructor(interval) {
        /** @type {number} */
        this.interval = interval;
        /** @type {boolean} */
        this.isActive = false;
        /** @type {number | null} */
        this.clickIntervalId = null;
    }

    /**
     * Start the autoclicker.
     */
    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.clickIntervalId = setInterval(() => this.click(), this.interval);
    }

    /**
     * Stop the autoclicker.
     */
    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        if (this.clickIntervalId !== null) {
            clearInterval(this.clickIntervalId);
            this.clickIntervalId = null;
        }
    }

    /**
     * Simulate a click event.
     */
    click() {
        console.log('Click!');
        // Logic to trigger actual click event can go here.
    }
}

// Exporting the AutoClickerHandler class
module.exports = AutoClickerHandler;
