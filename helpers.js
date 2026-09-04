/**
 * Generates human-like organic delay variance using a simplified chaotic Logistic Map
 */
function* organicDelayGenerator(baseDelay, variance, r = 3.9) {
  let x = 0.5;
  while (true) {
    x = r * x * (1 - x);
    const jitter = (x - 0.5) * 2 * variance;
    yield Math.max(1, Math.round(baseDelay + jitter));
  }
}

/**
 * Creates a promise that resolves after a specified duration
 */
export const nap = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Dispatches a hyper-realistic click sequence to a target element
 */
export async function simulateHumanClick(element, baseDelay = 100) {
  if (!element || !(element instanceof HTMLElement)) return false;

  const rect = element.getBoundingClientRect();
  const xOffset = (Math.random() - 0.5) * (rect.width * 0.3);
  const yOffset = (Math.random() - 0.5) * (rect.height * 0.3);
  const clientX = rect.left + rect.width / 2 + xOffset;
  const clientY = rect.top + rect.height / 2 + yOffset;

  const commonProps = {
    clientX,
    clientY,
    bubbles: true,
    cancelable: true,
    view: window,
  };

  element.dispatchEvent(new PointerEvent('pointerdown', { ...commonProps, button: 0 }));
  element.dispatchEvent(new MouseEvent('mousedown', { ...commonProps, button: 0 }));

  const holdDelay = Math.floor(Math.random() * 30) + 10;
  await nap(holdDelay);

  element.dispatchEvent(new PointerEvent('pointerup', { ...commonProps, button: 0 }));
  element.dispatchEvent(new MouseEvent('mouseup', { ...commonProps, button: 0 }));
  element.dispatchEvent(new MouseEvent('click', { ...commonProps, button: 0 }));

  return true;
}

/**
 * Generates an infinite stream of click intervals
 */
export function createIntervalStream(baseDelay, variance) {
  const gen = organicDelayGenerator(baseDelay, variance);
  return {
    next: () => gen.next().value
  };
}