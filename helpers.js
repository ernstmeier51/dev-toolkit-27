const defaults = {
  clickInterval: 500,
  maxClicks: 100,
  targetSelector: ".auto-click-target",
  randomizeDelay: false,
  delayVariance: 100,
  stopOnError: true,
  logLevel: "info"
};

function createConfig(userSettings = {}) {
  const configProxy = new Proxy(userSettings, {
    get(obj, key) {
      if (key in obj) return obj[key];
      return defaults[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      return true;
    },
    ownKeys(obj) {
      return [...new Set([...Object.keys(obj), ...Object.keys(defaults)])];
    },
    getOwnPropertyDescriptor(obj, key) {
      return {
        value: key in obj ? obj[key] : defaults[key],
        enumerable: true,
        configurable: true
      };
    }
  });
  function load(overrides = {}) {
    const merged = Object.assign({}, userSettings, overrides);
    const proxy = new Proxy(merged, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }
        if (prop in defaults) {
          return defaults[prop];
        }
        return undefined;
      }
    });
    return validate(proxy);
  }
  function validate(cfg) {
    if (typeof cfg.clickInterval !== "number" || cfg.clickInterval < 10) {
      cfg.clickInterval = defaults.clickInterval;
    }
    if (typeof cfg.maxClicks !== "number" || cfg.maxClicks < 1) {
      cfg.maxClicks = defaults.maxClicks;
    }
    if (typeof cfg.targetSelector !== "string" || cfg.targetSelector.length === 0) {
      cfg.targetSelector = defaults.targetSelector;
    }
    return cfg;
  }
  configProxy.load = load;
  configProxy.getDefaults = () => Object.assign({}, defaults);
  configProxy.update = (updates) => {
    if (updates && typeof updates === "object") {
      Object.keys(updates).forEach(key => {
        if (key in defaults) {
          userSettings[key] = updates[key];
        }
      });
    }
    return configProxy;
  };
  return configProxy;
}

const config = createConfig();
module.exports = { createConfig, config };