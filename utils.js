// @ts-check
/**
 * A utility function to simulate a mouse click.
 * @param {Element} element - The DOM element to click.
 * @returns {void}
 */
function simulateClick(element) {
    if (element instanceof Element) {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        element.dispatchEvent(event);
    } else {
        console.error('Provided argument is not a valid DOM element');
    }
}

/**
 * A utility function to generate a random integer within a given range.
 * @param {number} min - The minimum integer value.
 * @param {number} max - The maximum integer value.
 * @returns {number} - A random integer between min and max.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * A utility function to pause execution for a given duration.
 * @param {number} ms - Duration in milliseconds.
 * @returns {Promise<void>} - A promise that resolves after the specified duration.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { simulateClick, getRandomInt, sleep };