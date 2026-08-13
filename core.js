class AutoClicker {
    constructor(targetElement, interval) {
        this.targetElement = targetElement;
        this.interval = interval;
        this.clickTimeout = null;
        this.isClicking = false;
    }

    startClicking() {
        if (this.isClicking) return;
        this.isClicking = true;
        this.click();
    }

    click() {
        this.targetElement.click();
        this.clickTimeout = setTimeout(() => this.click(), this.interval);
    }

    stopClicking() {
        if (!this.isClicking) return;
        this.isClicking = false;
        clearTimeout(this.clickTimeout);
    }
}

const targetElement = document.getElementById('myButton');
const autoclicker = new AutoClicker(targetElement, 1000);

// Example start and stop calls
// autoclicker.startClicking();
// setTimeout(() => autoclicker.stopClicking(), 10000);