// @ts-check

/**
 * Simulates mouse clicks at specified intervals.
 * @param {number} interval - The interval between clicks in milliseconds.
 * @param {number} count - The number of clicks to perform.
 * @returns {Promise<void>} - A promise that resolves when clicking is done.
 */
async function autoClicker(interval, count) {
    for (let i = 0; i < count; i++) {
        // Simulate mouse click event
        document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, interval));
    }
}

/**
 * Starts the auto clicker with given parameters.
 * @param {number} interval - Interval in milliseconds.
 * @param {number} count - Total clicks to be executed.
 */
function startAutoClicker(interval, count) {
    // Perform basic validation
    if (typeof interval !== 'number' || typeof count !== 'number') {
        throw new Error('Interval and count must be numbers.');
    }
    if (interval <= 0 || count <= 0) {
        throw new Error('Interval and count must be positive.');
    }
    autoClicker(interval, count);
}

// Example usage
// startAutoClicker(1000, 5); // Click every second, 5 times
