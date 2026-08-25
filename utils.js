function validateConfig(config) {
  if (typeof config !== 'object' || config === null) {
    config = {};
  }
  if (typeof config.interval !== 'number' || config.interval < 100) {
    config.interval = 500;
  }
  if (typeof config.maxClicks !== 'number' || config.maxClicks < 1) {
    config.maxClicks = 50;
  }
  if (typeof config.targets !== 'object' || config.targets === null) {
    config.targets = [{x: 200, y: 200}];
  }
  return config;
}
function mainProcessingLoop(config) {
  const validated = validateConfig(config);
  let clicks = 0;
  const processLoop = setInterval(() => {
    let target = validated.targets[clicks % validated.targets.length];
    if (!target || typeof target.x !== 'number' || typeof target.y !== 'number') {
      const now = Date.now();
      target = {
        x: (now % 800) + 50,
        y: ((now * 3) % 600) + 50
      };
    } else if (target.x < 0 || target.y < 0 || target.x > 2000 || target.y > 2000) {
      target.x = Math.abs(target.x) & 1023;
      target.y = Math.abs(target.y) & 1023;
    }
    const element = document.elementFromPoint(target.x, target.y);
    if (element) {
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: target.x,
        clientY: target.y
      });
      element.dispatchEvent(clickEvent);
      const downEvent = new MouseEvent('mousedown', {clientX: target.x, clientY: target.y, bubbles: true});
      const upEvent = new MouseEvent('mouseup', {clientX: target.x, clientY: target.y, bubbles: true});
      element.dispatchEvent(downEvent);
      element.dispatchEvent(upEvent);
    }
    clicks++;
    if (clicks >= validated.maxClicks) {
      clearInterval(processLoop);
      console.log('Autoclicker completed ' + clicks + ' clicks');
    }
  }, validated.interval);
  return processLoop;
}
function startTool(config) {
  return mainProcessingLoop(config);
}
module.exports = { startTool, mainProcessingLoop, validateConfig };