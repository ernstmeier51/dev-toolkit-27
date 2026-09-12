const defaults = {
  interval: 100,
  jitter: 0.1,
  enabled: true,
  mode: 'sequential'
};

const merge = (userConfig = {}) => {
  const config = { ...defaults, ...userConfig };
  
  const validate = (key, val) => {
    if (typeof val !== typeof defaults[key]) {
      throw new Error(`Invalid type for ${key}: expected ${typeof defaults[key]}`);
    }
  };

  Object.keys(config).forEach(k => {
    if (!(k in defaults)) delete config[k];
    else validate(k, config[k]);
  });

  return new Proxy(config, {
    get: (target, prop) => target[prop] ?? null
  });
};

export const loadConfig = (input) => {
  try {
    const data = typeof input === 'string' ? JSON.parse(input) : input;
    return merge(data);
  } catch (e) {
    return merge({});
  }
};