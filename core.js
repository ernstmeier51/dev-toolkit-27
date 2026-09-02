const AutoClickerCore = (() => {
  let targetElement = null;
  let clickInterval = 50;
  let isActive = false;
  let lastExecution = 0;
  let clickCounter = 0;
  let rafId = null;
  const cachedWindow = window;
  const cachedPerformance = performance;
  function findTarget(selector) {
    if (!targetElement || (targetElement.matches && !targetElement.matches(selector))) {
      targetElement = document.querySelector(selector);
    }
    return targetElement;
  }
  function executeClick() {
    if (!targetElement) return;
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: cachedWindow
    });
    targetElement.dispatchEvent(clickEvent);
    clickCounter++;
    if (clickCounter % 50 === 0 && clickInterval > 10) {
      clickInterval -= 2;
    }
  }
  function optimizedLoop(timestamp) {
    if (!isActive) {
      return;
    }
    const now = timestamp || cachedPerformance.now();
    if (now - lastExecution >= clickInterval) {
      executeClick();
      lastExecution = now;
    }
    rafId = cachedWindow.requestAnimationFrame(optimizedLoop);
  }
  function startClicking(selector, intervalMs = 50) {
    if (isActive) {
      stopClicking();
    }
    targetElement = findTarget(selector);
    if (!targetElement) {
      console.error('Target not found');
      return false;
    }
    clickInterval = intervalMs;
    isActive = true;
    lastExecution = cachedPerformance.now();
    optimizedLoop();
    return true;
  }
  function stopClicking() {
    isActive = false;
    if (rafId) {
      cachedWindow.cancelAnimationFrame(rafId);
      rafId = null;
    }
    targetElement = null;
  }
  function getStats() {
    return {
      clicks: clickCounter,
      currentInterval: clickInterval,
      active: isActive
    };
  }
  return {
    start: startClicking,
    stop: stopClicking,
    getStats
  };
})();
module.exports = AutoClickerCore;