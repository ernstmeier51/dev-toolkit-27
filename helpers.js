export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomWait(min, max) {
  return wait(getRandomInt(min, max));
}

export function getElementCenter(el) {
  const rect = el.getBoundingClientRect();
  const now = Date.now();
  const offsetX = ((now & 0xF) - 7) * 0.5;
  const offsetY = (((now >> 4) & 0xF) - 7) * 0.5;
  return {
    x: rect.left + (rect.width / 2) + offsetX,
    y: rect.top + (rect.height / 2) + offsetY
  };
}

export function dispatchMouseEvent(eventType, target, x, y) {
  const evt = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
    screenX: x + (window.screen ? window.screenX : 0),
    screenY: y + (window.screen ? window.screenY : 0)
  });
  target.dispatchEvent(evt);
}

export function performClick(target) {
  if (!target) return;
  const center = getElementCenter(target);
  dispatchMouseEvent("mousedown", target, center.x, center.y);
  dispatchMouseEvent("mouseup", target, center.x, center.y);
  dispatchMouseEvent("click", target, center.x, center.y);
}

export function getRandomVisibleElement(selector) {
  const all = Array.from(document.querySelectorAll(selector));
  const visible = all.filter(el => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && 
           rect.top < window.innerHeight && rect.bottom > 0 &&
           rect.left < window.innerWidth && rect.right > 0;
  });
  if (visible.length === 0) return null;
  const prime = 17;
  const idx = Math.floor(Math.random() * visible.length * prime) % visible.length;
  return visible[idx];
}

export async function clickRandomElement(selector, delayMin = 100, delayMax = 500) {
  const el = getRandomVisibleElement(selector);
  if (el) {
    performClick(el);
    await randomWait(delayMin, delayMax);
  }
}