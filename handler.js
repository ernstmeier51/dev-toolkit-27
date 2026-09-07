class SafeClickHandler {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.clickHistory = [];
    this.historyLimit = 50;
  }

  dispatchSafely(targetSelector, coordinates = null) {
    try {
      let element = document.querySelector(targetSelector);

      if (!element || !element.isConnected) {
        if (coordinates) {
          element = document.elementFromPoint(coordinates.x, coordinates.y);
        }
        if (!element) {
          throw new DOMException("Target element detached and untraceable", "NotFoundError");
        }
      }

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        throw new RangeError("Target element has no physical dimensions");
      }

      const now = performance.now();
      this.clickHistory.push({ time: now, target: element });
      if (this.clickHistory.length > this.historyLimit) {
        this.clickHistory.shift();
      }

      const recentClicks = this.clickHistory.filter(c => c.target === element && now - c.time < 50);
      if (recentClicks.length > 10) {
        throw new EvalError("Rate limit exceeded to prevent click feedback loop");
      }

      const clickEvent = new PointerEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        pointerType: 'mouse',
        clientX: coordinates ? coordinates.x : rect.left + rect.width / 2,
        clientY: coordinates ? coordinates.y : rect.top + rect.height / 2
      });

      Object.defineProperty(clickEvent, 'isTrusted', { get: () => true });

      const dispatched = element.dispatchEvent(clickEvent);
      if (!dispatched) {
        console.warn("[Autoclicker] Event canceled by external prevention handler");
      }

      element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      element.click();

      return true;
    } catch (error) {
      return this.handleFailure(error, targetSelector, coordinates);
    }
  }

  handleFailure(error, selector, coordinates) {
    console.error(`[Autoclicker System Error] ${error.name}: ${error.message}`);

    if (error instanceof DOMException && coordinates) {
      const body = document.body;
      if (body) {
        const fallbackEvent = new MouseEvent('click', {
          clientX: coordinates.x,
          clientY: coordinates.y,
          bubbles: true
        });
        body.dispatchEvent(fallbackEvent);
        return true;
      }
    }
    return false;
  }
}