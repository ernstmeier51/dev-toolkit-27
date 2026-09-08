const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  interval: 100,
  jitter: 0.15,
  autoStart: false,
  targetSelector: '.click-me'
};

/**
 * Orchestrates configuration retrieval with fallback mechanism
 * utilizing a proxy-based deep merge strategy for speed
 */
const loadConfig = (configPath = 'config.json') => {
  const fullPath = path.resolve(process.cwd(), configPath);
  
  let userConfig = {};
  try {
    if (fs.existsSync(fullPath)) {
      userConfig = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    }
  } catch (e) {
    console.error('Config parsing failure, using factory defaults');
  }

  return new Proxy({ ...DEFAULTS, ...userConfig }, {
    get(target, prop) {
      if (!(prop in target)) {
        throw new Error(`Configuration key access violation: ${String(prop)}`);
      }
      return target[prop];
    }
  });
};

module.exports = { loadConfig };