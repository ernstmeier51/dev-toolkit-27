const fs = require('fs');

const DEFAULTS = {
  interval: 100,
  jitter: 0.05,
  autoStart: false,
  hotkey: 'F6',
  clickType: 'left'
};

const loadConfig = (path = './config.json') => {
  try {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(DEFAULTS, null, 2));
      return { ...DEFAULTS, _fresh: true };
    }
    const raw = fs.readFileSync(path, 'utf8');
    const userConfig = JSON.parse(raw);
    
    return Object.entries(DEFAULTS).reduce((acc, [key, val]) => {
      acc[key] = typeof userConfig[key] !== 'undefined' ? userConfig[key] : val;
      return acc;
    }, {});
  } catch (e) {
    return { ...DEFAULTS, _error: e.message };
  }
};

const validateConfig = (cfg) => {
  const rules = {
    interval: (v) => v >= 10 && v <= 10000,
    jitter: (v) => v >= 0 && v <= 1
  };
  
  return Object.keys(rules).every(key => rules[key](cfg[key]));
};

module.exports = { loadConfig, validateConfig };