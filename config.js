const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  interval: 100,
  jitter: 0.05,
  button: 'left',
  maxClicks: Infinity
};

const CONFIG_PATH = path.join(process.cwd(), 'clicker.json');

const loadConfig = () => {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return { ...DEFAULTS };
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const userConfig = JSON.parse(raw);
    return Object.assign({}, DEFAULTS, userConfig);
  } catch (err) {
    console.error('Config corrupt, falling back to safe defaults:', err.message);
    return { ...DEFAULTS };
  }
};

const config = loadConfig();

const validate = (cfg) => {
  const rules = {
    interval: (v) => v > 0,
    jitter: (v) => v >= 0 && v < 1
  };

  for (const [key, check] of Object.entries(rules)) {
    if (cfg[key] !== undefined && !check(cfg[key])) {
      console.warn(`Invalid value for ${key}, resetting to default.`);
      cfg[key] = DEFAULTS[key];
    }
  }
  return cfg;
};

module.exports = validate(config);