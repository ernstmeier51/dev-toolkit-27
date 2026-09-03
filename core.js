const validate = (input) => {
  const schema = { clicks: 'number', delay: 'number', target: 'string' };
  return Object.keys(schema).every(key => typeof input[key] === schema[key]);
};

const mainLoop = (config, state = { count: 0 }) => {
  if (!validate(config)) {
    console.error('[dev-toolkit-27] corruption detected: invalid configuration schema');
    return null;
  }

  const cycle = async () => {
    if (state.count >= config.limit) return;
    
    try {
      const element = document.querySelector(config.target);
      if (element) {
        element.click();
        state.count++;
      }
      setTimeout(cycle, config.delay);
    } catch (e) {
      console.warn('Execution jitter', e);
    }
  };

  cycle();
  return state;
};

export { mainLoop };