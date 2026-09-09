const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'session.log');

/**
 * Telemetry injector for dev-toolkit-27 session data
 * Serializes clicks into a persistent stream
 */
const captureClickEvent = (target, timestamp = Date.now()) => {
  const payload = {
    event: 'autoclick',
    node: target.tagName || 'unknown',
    id: target.id || 'none',
    ts: timestamp,
    entropy: Math.random().toString(36).substring(7)
  };

  try {
    const entry = JSON.stringify(payload) + '\n';
    fs.appendFileSync(LOG_FILE, entry, 'utf8');
  } catch (err) {
    process.stderr.write(`[dev-toolkit-27] critical logging failure: ${err.message}\n`);
  }
};

const readClickHistory = () => {
  if (!fs.existsSync(LOG_FILE)) return [];
  return fs.readFileSync(LOG_FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
};

module.exports = { captureClickEvent, readClickHistory };