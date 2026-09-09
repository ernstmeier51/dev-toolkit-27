/**
 * @typedef {Object} LogEntry
 * @property {string} level
 * @property {string} message
 * @property {number} timestamp
 */

/**
 * @param {string} level 
 * @param {string} msg 
 * @returns {LogEntry}
 */
const createEntry = (level, msg) => ({
  level,
  message: `[dev-toolkit-27] ${msg}`,
  timestamp: Date.now()
});

/**
 * @param {'INFO' | 'WARN' | 'ERROR'} level 
 * @param {string} message 
 * @returns {void}
 */
export const log = (level, message) => {
  const entry = createEntry(level, message);
  const colorMap = {
    INFO: '\x1b[36m',
    WARN: '\x1b[33m',
    ERROR: '\x1b[31m'
  };
  
  console.log(
    `${colorMap[level] || ''}%s\x1b[0m %s`, 
    `[${entry.level}]`,
    entry.message
  );
};

/**
 * @param {Error} err 
 * @returns {void}
 */
export const error = (err) => {
  log('ERROR', `${err.name}: ${err.message}`);
};