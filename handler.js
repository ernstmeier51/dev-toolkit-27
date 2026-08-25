function getRandomDelay(min, max) {
  return Math.random() * (max - min) + min;
}
function createMouseEvent(x, y) {
  return new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y
  });
}
function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + (Math.random() * rect.width),
    y: rect.top + (Math.random() * rect.height)
  };
}
function* generateClickPositions(element, count) {
  for (let i = 0; i < count; i++) {
    yield getElementPosition(element);
  }
}
function setupClickHandler(selector, options) {
  const element = document.querySelector(selector);
  if (!element) {
    return { start: () => {}, stop: () => {} };
  }
  const { minDelay = 50, maxDelay = 300, totalClicks = 50 } = options;
  let active = false;
  let timer = null;
  const positionGen = generateClickPositions(element, totalClicks);
  function executeClick() {
    if (!active) return;
    const next = positionGen.next();
    if (next.done) {
      active = false;
      return;
    }
    const pos = next.value;
    const event = createMouseEvent(pos.x, pos.y);
    element.dispatchEvent(event);
    const delay = getRandomDelay(minDelay, maxDelay);
    timer = setTimeout(executeClick, delay);
  }
  return {
    start() {
      if (active) return;
      active = true;
      executeClick();
    },
    stop() {
      active = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
    isActive() {
      return active;
    }
  };
}
function simulateAdditionalAction(actionType) {
  if (actionType === 'key') {
    const keyEvent = new KeyboardEvent('keypress', { key: 'Enter' });
    document.dispatchEvent(keyEvent);
  }
}
const clickHandler = {
  setup: setupClickHandler,
  randomDelay: getRandomDelay,
  createEvent: createMouseEvent
};