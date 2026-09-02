const createAutoclicker = (config) => {
  const { target, cps = 10, maxDuration = 10000 } = config;
  let clicks = 0;
  let active = false;
  let frame = null;
  let startTime = 0;
  const intervalMs = 1000 / cps;
  let nextClickTime = 0;
  const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
  const stop = () => {
    active = false;
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  };
  const loop = () => {
    if (!active) return;
    const now = performance.now();
    if (now >= nextClickTime) {
      if (now - startTime > maxDuration) {
        stop();
        return;
      }
      target.dispatchEvent(clickEvent);
      clicks++;
      nextClickTime = now + intervalMs;
    }
    frame = requestAnimationFrame(loop);
  };
  const start = () => {
    if (active) return;
    active = true;
    startTime = performance.now();
    nextClickTime = startTime;
    loop();
  };
  return {
    start,
    stop,
    getClicks: () => clicks,
    isActive: () => active
  };
};
module.exports = { createAutoclicker };