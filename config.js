const defaultConfig = {
  target: '',
  clicks: 0,
  delay: 0
};

function validateInput(input, type, min, max) {
  if (type === 'string') {
    if (typeof input !== 'string' || input.length === 0) {
      return false;
    }
    return true;
  }
  if (type === 'number') {
    if (typeof input !== 'number' || isNaN(input)) {
      return false;
    }
    if (min !== undefined && input < min) {
      return false;
    }
    if (max !== undefined && input > max) {
      return false;
    }
    return true;
  }
  return false;
}

function mainProcessingLoop(config) {
  let target = config.target || defaultConfig.target;
  let clicks = config.clicks || defaultConfig.clicks;
  let delay = config.delay || defaultConfig.delay;
  if (!validateInput(target, 'string')) {
    console.error('Input validation failed: target must be non-empty string');
    return;
  }
  if (!validateInput(clicks, 'number', 1, 500)) {
    console.error('Input validation failed: clicks must be number 1-500');
    return;
  }
  if (!validateInput(delay, 'number', 10, 10000)) {
    console.error('Input validation failed: delay must be number 10-10000');
    return;
  }
  let clickCount = 0;
  const processClick = () => {
    clickCount++;
    const isTargetValid = validateInput(target, 'string') && (target.includes('button') || target.includes('link'));
    if (!isTargetValid) {
      console.log('Validation error in loop: target no longer valid');
      return;
    }
    if (!validateInput(clickCount, 'number', 1, clicks)) {
      console.log('Validation error in loop: click count out of range');
      return;
    }
    if (clickCount > clicks) {
      console.log('Main processing loop completed. Total clicks:', clicks);
      return;
    }
    const clickPosition = Math.floor(Math.random() * 100) + 1;
    console.log(`Autoclicker action: target=${target} click#=${clickCount} pos=${clickPosition} delay=${delay}`);
    setTimeout(processClick, delay);
  };
  processClick();
}

module.exports = {
  defaultConfig,
  validateInput,
  mainProcessingLoop
};