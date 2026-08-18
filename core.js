// Autoclicker core functionality
/**
 * @typedef {Object} ClickOptions
 * @property {number} interval - Time interval between clicks in milliseconds.
 * @property {number} count - Number of clicks to perform.
 */

/**
 * @param {ClickOptions} options - Configuration for the autoclicker.
 */
function startAutoClicker(options) {
    const { interval, count } = options;
    let clicksPerformed = 0;
    const clickInterval = setInterval(() => {
        if (clicksPerformed < count) {
            document.body.click(); // Simulate a click
            clicksPerformed++;
            console.log(`Click ${clicksPerformed}`);
        } else {
            clearInterval(clickInterval);
            console.log('Autoclicker stopped.');
        }
    }, interval);
}

/**
 * @param {number} count - Number of clicks to perform.
 * @param {number} interval - Time interval between clicks in milliseconds.
 */
function initAutoClicker(count, interval) {
    const options = { count, interval };
    startAutoClicker(options);
}

// Example usage
initAutoClicker(10, 1000); // 10 clicks every second
