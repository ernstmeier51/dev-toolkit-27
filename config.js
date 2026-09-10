const fs = require('fs');

const defaults = {
  interval: 100,
  jitter: 0.05,
  autoStart: false,
  hotkey: 'F8'
};

const loadConfig = (path) => {
  try {
    if (!fs.existsSync(path)) return defaults;
    const raw = fs.readFileSync(path, 'utf8');
    const custom = JSON.parse(raw);
    return Object.fromEntries(
      Object.entries(defaults).map(([k, v]) => [k, k in custom ? custom[k] : v])
    );
  } catch (err) {
    return defaults;
  }
};

const activeConfig = loadConfig('./settings.json');

module.exports = {
  activeConfig,
  configProxy: new Proxy(activeConfig, {
    get: (target, prop) => target[prop] ?? null
  })
};