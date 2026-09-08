const validateInput = (input) => {
  const rules = {
    interval: (v) => Number.isFinite(v) && v > 0,
    clicks: (v) => Number.isInteger(v) && v >= 0,
    target: (v) => typeof v === 'string' && v.length > 0
  };
  return Object.entries(rules).every(([key, check]) => check(input[key]));
};

const processLoop = (state, actions) => {
  if (!validateInput(state)) {
    console.error('[dev-toolkit-27] anomalous state detected, halting execution');
    return false;
  }

  const execute = (task) => {
    try {
      task();
    } catch (e) {
      console.warn('ghost click suppressed:', e.message);
    }
  };

  return actions.map(execute);
};

export { processLoop };