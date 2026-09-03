const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  interval: 100,
  jitter: 5,
  maxClicks: 0,
  targetSelector: 'button.click-me',
  debug: false
};

const loadConfig = (configPath = './config.json') => {
  try {
    const raw = fs.readFileSync(path.resolve(configPath), 'utf8');
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn('Config not found, using defaults.');
      return { ...DEFAULT_CONFIG };
    }
    throw new Error('Config corruption detected');
  }
};

const validateConfig = (config) => {
  const constraints = {
    interval: (v) => v > 0,
    jitter: (v) => v >= 0,
    maxClicks: (v) => v >= 0
  };

  for (const [key, test] of Object.entries(constraints)) {
    if (!test(config[key])) {
      throw new Error(`Invalid config value: ${key}`);
    }
  }
  return true;
};

module.exports = { loadConfig, validateConfig };