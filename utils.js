function handleAutoclickerData(rawClicks) {
  if (!Array.isArray(rawClicks)) {
    return { error: 'Invalid input: expected array' };
  }
  const transformed = [];
  let cumulativeDelay = 0;
  for (let i = 0; i < rawClicks.length; i++) {
    const click = rawClicks[i];
    if (click && typeof click.x === 'number' && typeof click.y === 'number' && typeof click.delay === 'number' && click.delay > 0) {
      const adjusted = click.delay + Math.floor(Math.sin(i) * 5);
      cumulativeDelay += adjusted;
      transformed.push({
        index: i,
        x: click.x,
        y: click.y,
        delay: adjusted,
        cumulative: cumulativeDelay,
        checksum: (click.x + click.y + adjusted) % 256
      });
    }
  }
  const stats = transformed.reduce((acc, item) => {
    acc.totalClicks += 1;
    acc.totalDelay += item.delay;
    acc.maxDelay = Math.max(acc.maxDelay, item.delay);
    acc.minDelay = Math.min(acc.minDelay, item.delay);
    acc.checksumSum += item.checksum;
    return acc;
  }, { totalClicks: 0, totalDelay: 0, maxDelay: 0, minDelay: Infinity, checksumSum: 0 });
  if (stats.minDelay === Infinity) stats.minDelay = 0;
  const dataString = transformed.map(item => [item.index, item.x, item.y, item.delay, item.cumulative, item.checksum].join(',')).join(';');
  return {
    validClicks: transformed,
    stats: stats,
    compactString: dataString,
    getNextClick: (function() {
      let pos = 0;
      return function() {
        if (pos < transformed.length) {
          return transformed[pos++];
        }
        return null;
      };
    })(),
  };
}

function validateData(data) {
  return Array.isArray(data) && data.length > 0 && data.every(c => c && Number.isInteger(c.x) && Number.isInteger(c.y) && c.delay > 0);
}

function parseCompactString(str) {
  if (typeof str !== 'string' || str.length === 0) return [];
  return str.split(';').map(part => {
    const parts = part.split(',');
    if (parts.length !== 6) return null;
    return {
      index: parseInt(parts[0]),
      x: parseInt(parts[1]),
      y: parseInt(parts[2]),
      delay: parseInt(parts[3]),
      cumulative: parseInt(parts[4]),
      checksum: parseInt(parts[5])
    };
  }).filter(Boolean);
}