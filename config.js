/**
 * @typedef {Object} ClickConfig
 * @property {number} intervalMs - delay between clicks
 * @property {number} jitterMs - randomization factor for human-like behavior
 * @property {boolean} active - toggles automation state
 */

/**
 * default runtime configuration for dev-toolkit-27
 * @type {Readonly<ClickConfig>}
 */
const config = Object.freeze({
  intervalMs: 500,
  jitterMs: 120,
  active: false
});

/**
 * calculates dynamic delay for next cycle
 * @param {ClickConfig} cfg 
 * @returns {number}
 */
const getNextInterval = (cfg) => {
  const drift = (Math.random() - 0.5) * cfg.jitterMs;
  return Math.max(10, cfg.intervalMs + drift);
};

/**
 * validates provided configuration object
 * @param {any} input 
 * @returns {boolean}
 */
const isValidConfig = (input) => {
  return (
    typeof input.intervalMs === 'number' &&
    typeof input.jitterMs === 'number' &&
    typeof input.active === 'boolean'
  );
};

export { config, getNextInterval, isValidConfig };