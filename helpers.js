/**
 * @typedef {Object} ClickOptions
 * @property {number} [xOffset]
 * @property {number} [yOffset]
 */

/**
 * Simulates click on element with offset and random micro adjustment.
 * @param {HTMLElement} element
 * @param {ClickOptions} [options]
 * @returns {void}
 */
function simulateClick(element, options = {}) {
  const { xOffset = 0, yOffset = 0 } = options;
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + xOffset + (Math.random() - 0.5) * 2;
  const y = rect.top + rect.height / 2 + yOffset + (Math.random() - 0.5) * 2;
  const clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y });
  element.dispatchEvent(clickEvent);
}

/**
 * Starts autoclicker cycling through matching elements.
 * @param {string} selector
 * @param {number} interval
 * @returns {number}
 */
function startAutoclicker(selector, interval) {
  const elements = document.querySelectorAll(selector);
  let index = 0;
  return setInterval(() => {
    if (elements.length > 0) {
      const el = elements[index % elements.length];
      if (el) simulateClick(el);
      index++;
    }
  }, interval);
}

/**
 * Stops autoclicker by interval id.
 * @param {number} id
 * @returns {void}
 */
function stopAutoclicker(id) {
  clearInterval(id);
}

/**
 * @typedef {Object} AutoClickConfig
 * @property {string} selector
 * @property {number} interval
 * @property {number} maxClicks
 */

/**
 * Runs autoclick for maxClicks with creative element cycling.
 * @param {AutoClickConfig} config
 * @returns {Promise<void>}
 */
function runLimitedAutoclicker(config) {
  return new Promise(resolve => {
    const { selector, interval, maxClicks = 10 } = config;
    const elements = document.querySelectorAll(selector);
    let count = 0, index = 0;
    const id = setInterval(() => {
      if (count >= maxClicks || elements.length === 0) {
        clearInterval(id);
        resolve();
        return;
      }
      const el = elements[index % elements.length];
      if (el) {
        simulateClick(el);
        count++;
      }
      index++;
    }, interval);
  });
}