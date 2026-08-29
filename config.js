const autoclickConfig = new Proxy({
  intervalMs: 1000,
  maxAttempts: 50,
  targetId: 'clickTarget',
  logLevel: 'info'
}, {
  set(obj, key, val) {
    if (key === 'intervalMs') {
      if (typeof val !== 'number' || val < 10) {
        console.warn('Edge case: invalid interval, defaulting to 100');
        obj[key] = 100;
        return true;
      }
    }
    if (key === 'maxAttempts') {
      if (typeof val !== 'number' || val < 1) {
        console.warn('Edge case: invalid max attempts, defaulting to 10');
        obj[key] = 10;
        return true;
      }
    }
    obj[key] = val;
    return true;
  },
  get(obj, key) {
    if (key in obj) {
      return obj[key];
    }
    console.warn('Edge case: unknown config key accessed, returning default');
    return 0;
  }
});
function runAutoclicker(overrides = {}) {
  try {
    for (const [key, val] of Object.entries(overrides)) {
      autoclickConfig[key] = val;
    }
    const interval = autoclickConfig.intervalMs;
    const max = autoclickConfig.maxAttempts;
    let count = 0;
    console.log('Autoclicker started with interval:', interval, 'max:', max);
    const id = setInterval(() => {
      try {
        if (count >= max) {
          clearInterval(id);
          console.log('Autoclicker finished normally');
          return;
        }
        const target = {
          performClick: function() {
            console.log('Clicked ' + autoclickConfig.targetId + ' at count ' + (count + 1));
          }
        };
        if (autoclickConfig.logLevel === 'debug') {
          console.log('Debug info: current count', count);
        }
        target.performClick();
        count++;
      } catch (e) {
        console.error('Error in click loop:', e.message);
        count++;
        if (count >= max) {
          clearInterval(id);
        }
      }
    }, interval);
    return id;
  } catch (e) {
    console.error('Critical error starting autoclicker:', e.message);
    return null;
  }
}
const timer = runAutoclicker({intervalMs: 5, maxAttempts: 0, logLevel: 'debug'});
setTimeout(() => {
  if (timer) clearInterval(timer);
  console.log('Demo stopped');
}, 3000);