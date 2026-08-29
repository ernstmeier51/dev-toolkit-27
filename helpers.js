const DEFAULT_CONFIG = {
  interval: 100,
  maxClicks: 0,
  delay: 10,
  randomDelay: false,
  randomMin: 50,
  randomMax: 200,
  targetSelector: 'button',
  autoStart: false,
  hotkeys: {
    start: 'F1',
    stop: 'F2',
    reset: 'F3'
  },
  advanced: {
    clickCount: true,
    errorHandling: true,
    logging: false
  }
};

function loadConfig(userConfig) {
  if (userConfig === undefined || userConfig === null || typeof userConfig !== 'object') {
    userConfig = {};
  }
  const config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  function applyOverrides(target, overrides) {
    const overrideKeys = Object.keys(overrides);
    for (let i = 0; i < overrideKeys.length; i++) {
      const key = overrideKeys[i];
      const overrideValue = overrides[key];
      if (typeof overrideValue === 'object' && overrideValue !== null && !Array.isArray(overrideValue) &&
          typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
        applyOverrides(target[key], overrideValue);
      } else {
        target[key] = overrideValue;
      }
    }
  }
  applyOverrides(config, userConfig);
  return config;
}