// @ts-check
/**
 * Simulates mouse clicks at a given interval on a specified element.
 * @param {HTMLElement} element - The target element to click on.
 * @param {number} interval - The interval in milliseconds between clicks.
 * @param {number} count - The total number of clicks to perform.
 */
function startAutoClicker(element, interval, count) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error('Invalid element provided.');
    }
    if (typeof interval !== 'number' || interval <= 0) {
        throw new Error('Interval must be a positive number.');
    }
    if (typeof count !== 'number' || count <= 0) {
        throw new Error('Count must be a positive number.');
    }

    let clicksPerformed = 0;

    const clickInterval = setInterval(() => {
        if (clicksPerformed < count) {
            element.click();
            clicksPerformed++;
        } else {
            clearInterval(clickInterval);
        }
    }, interval);
}

// Example usage:
// const button = document.getElementById('myButton');
// startAutoClicker(button, 1000, 10);