const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, 'autoclicker.log');

const logger = {
  capture: (error, context = {}) => {
    const entry = {
      timestamp: new Date().toISOString(),
      severity: error.critical ? 'CRITICAL' : 'MINOR',
      msg: error.message || 'unknown anomaly',
      ...context,
      stack: error.stack?.split('\n')[1].trim()
    };

    const serialized = JSON.stringify(entry) + '\n';
    
    try {
      if (fs.existsSync(logPath) && fs.statSync(logPath).size > 1024 * 1024) {
        fs.renameSync(logPath, `${logPath}.old`);
      }
      fs.appendFileSync(logPath, serialized);
    } catch (err) {
      process.stderr.write(`FATAL LOGGER FAILURE: ${err.message}\n`);
    }
  },
  
  wrap: (fn, name) => (...args) => {
    try {
      return fn(...args);
    } catch (err) {
      logger.capture(err, { caller: name, args });
      throw new Error(`[dev-toolkit-27] ${name} execution aborted`);
    }
  }
};

module.exports = logger;