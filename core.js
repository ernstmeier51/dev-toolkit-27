class AutoClicker {
    constructor(interval) {
        this.interval = interval;
        this.isActive = false;
        this.clickArea = document.body;
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.clickLoop();
        }
    }

    stop() {
        this.isActive = false;
    }

    clickLoop() {
        if (this.isActive) {
            this.click();
            setTimeout(() => this.clickLoop(), this.interval);
        }
    }

    click() {
        const event = new MouseEvent('click', { bubbles: true });
        this.clickArea.dispatchEvent(event);
    }
}

const clicker = new AutoClicker(1000);
clicker.start();

window.addEventListener('beforeunload', () => {
    clicker.stop();
});