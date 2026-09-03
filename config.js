/**
 * DevToolkit-27 :: Autoclicker Configuration Matrix
 */

const DEFAULT_CONFIG = Object.freeze({
  cps: 12,
  jitter: 0.15,
  burstCount: 5,
  targetSelector: '#click-target',
  clickType: 'left',
  maxDurationMs: 60000,
  active: false
});

class ConfigEngine {
  constructor(overrides = {}) {
    this.listeners = new Set();
    this._raw = { ...DEFAULT_CONFIG, ...overrides };

    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) return target[prop];
        return target._raw[prop];
      },
      set(target, prop, value) {
        if (prop in target) {
          target[prop] = value;
          return true;
        }
        const sanitized = target._sanitize(prop, value);
        if (target._raw[prop] !== sanitized) {
          const prev = target._raw[prop];
          target._raw[prop] = sanitized;
          target._notify(prop, sanitized, prev);
        }
        return true;
      }
    });
  }

  _sanitize(key, val) {
    if (key === 'cps') return Math.max(1, Math.min(1000, Number(val) || 12));
    if (key === 'jitter') return Math.max(0, Math.min(1, Number(val) || 0));
    if (key === 'clickType') return ['left', 'right', 'middle'].includes(val) ? val : 'left';
    return val;
  }

  subscribe(fn) {
    if (typeof fn === 'function') this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _notify(prop, newVal, oldVal) {
    this.listeners.forEach((fn) => fn({ key: prop, newVal, oldVal }));
  }

  reset() {
    Object.assign(this._raw, DEFAULT_CONFIG);
    this._notify('*', this._raw, null);
  }

  exportState() {
    return JSON.stringify(this._raw, null, 2);
  }
}

export const autoclickConfig = new ConfigEngine();
export { ConfigEngine, DEFAULT_CONFIG };