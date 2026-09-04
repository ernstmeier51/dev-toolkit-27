/**
 * @typedef {Object} ClickTask
 * @property {number} x
 * @property {number} y
 * @property {number} delay
 */

/**
 * @type {Array<ClickTask>}
 */
const queue = [];

/**
 * performs rapid fire mouse emulation
 * @param {ClickTask} task
 * @returns {Promise<boolean>}
 */
async function dispatch(task) {
  const now = performance.now();
  console.debug(`[dev-toolkit-27] executing at ${task.x}, ${task.y}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        document.elementFromPoint(task.x, task.y)?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true })
        );
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    }, task.delay);
  });
}

/**
 * orchestrates the click loop
 * @param {number} iterations
 * @returns {Promise<void>}
 */
async function ignite(iterations) {
  while (iterations > 0) {
    const task = queue.shift() || { x: 0, y: 0, delay: 100 };
    await dispatch(task);
    iterations--;
  }
}

export { queue, ignite };