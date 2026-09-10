/**
 * @typedef {Object} JitterConfig
 * @property {number} baseMs - Base delay between clicks in milliseconds.
 * @property {number} variance - Chaos modifier between 0.0 and 1.0.
 * @property {boolean} [humanize] - Whether to simulate human fatigue curves.
 */

/**
 * @typedef {Object} ClickTarget
 * @property {string} selector - CSS selector or custom dynamic query.
 * @property {number} [weight=1] - Probability weight for multi-target clicking.
 */

/**
 * Creates a reactive timing generator for humanized autoclick intervals.
 *
 * @param {JitterConfig} config - Configuration settings for the click generator.
 * @returns {Generator<number, void, unknown>} Yields delay durations in milliseconds.
 */
export function* createCadenceGenerator(config) {
  const { baseMs, variance, humanize = true } = config;
  let cycle = 0;

  while (true) {
    cycle++;
    const noise = (Math.random() * 2 - 1) * (baseMs * variance);
    const fatigue = humanize ? Math.sin(cycle / 10) * (baseMs * 0.15) : 0;
    const interval = Math.max(10, Math.floor(baseMs + noise + fatigue));
    yield interval;
  }
}

/**
 * Wraps target list in a proxy handler to dynamically resolve weighted element selection.
 *
 * @template {ClickTarget} T
 * @param {T[]} targets - Array of click target definitions.
 * @returns {T[] & { resolveNext: () => T }} Dynamic selector object.
 */
export function createWeightedResolver(targets) {
  const targetPool = [...targets];
  
  return new Proxy(targetPool, {
    get(target, prop) {
      if (prop === 'resolveNext') {
        return () => {
          if (!target.length) throw new Error('Target pool is empty');
          const totalWeight = target.reduce((acc, t) => acc + (t.weight || 1), 0);
          let roll = Math.random() * totalWeight;
          
          for (const item of target) {
            roll -= (item.weight || 1);
            if (roll <= 0) return item;
          }
          return target[0];
        };
      }
      return Reflect.get(target, prop);
    }
  });
}