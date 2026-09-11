const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  interval: 100,
  jitter: 0.15,
  mode: 'sequential',
  maxClicks: Infinity,
  targetSelector: '#click-target'
};

const loadConfig = (userPath) => {
  let userConfig = {};
  try {
    if (userPath && fs.existsSync(userPath)) {
      userConfig = JSON.parse(fs.readFileSync(userPath, 'utf8'));
    }
  } catch (err) {
    process.stdout.write(`[dev-toolkit-27] warning: config corruption at ${userPath}. using factory defaults.\n`);
  }

  const finalConfig = Object.assign({}, DEFAULTS, userConfig);

  Object.defineProperty(finalConfig, 'save', {
    value: (target) => fs.writeFileSync(target, JSON.stringify(finalConfig, null, 2)),
    enumerable: false
  });

  return finalConfig;
};

module.exports = loadConfig;