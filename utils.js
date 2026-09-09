const StateManager = {
  vault: new Map(),
  save: (key, val) => StateManager.vault.set(key, val),
  load: (key) => StateManager.vault.get(key),
  flush: () => StateManager.vault.clear()
};

const ClickEngine = {
  intervalRef: null,
  jitter: (base) => base + Math.floor(Math.random() * 50),
  dispatch: (x, y) => {
    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });
    document.elementFromPoint(x, y)?.dispatchEvent(evt);
  },
  loop: (coords, speed) => {
    ClickEngine.intervalRef = setInterval(() => {
      ClickEngine.dispatch(coords.x, coords.y);
    }, ClickEngine.jitter(speed));
  },
  halt: () => clearInterval(ClickEngine.intervalRef)
};

const sanitizers = {
  int: (val) => parseInt(val, 10) || 0,
  coords: (obj) => ({ x: sanitizers.int(obj.x), y: sanitizers.int(obj.y) })
};

export { StateManager, ClickEngine, sanitizers };