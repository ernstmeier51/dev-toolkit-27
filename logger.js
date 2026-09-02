const fs = require('fs');
const path = require('path');
function setupLogger(options = {}) {
  const logDir = options.logDir || './logs';
  const maxSize = options.maxSize || 1024 * 1024;
  const maxFiles = options.maxFiles || 5;
  const baseName = options.baseName || 'autoclicker';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  let currentFile = path.join(logDir, baseName + '.log');
  let stream = fs.createWriteStream(currentFile, { flags: 'a' });
  function rotate() {
    if (stream) stream.end();
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedFile = path.join(logDir, `${baseName}-${ts}.log`);
    if (fs.existsSync(currentFile)) {
      fs.renameSync(currentFile, rotatedFile);
    }
    const allLogs = fs.readdirSync(logDir)
      .filter(name => name.startsWith(baseName) && name.endsWith('.log'))
      .map(name => ({ name, time: fs.statSync(path.join(logDir, name)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);
    if (allLogs.length > maxFiles) {
      allLogs.slice(maxFiles).forEach(item => fs.unlinkSync(path.join(logDir, item.name)));
    }
    currentFile = path.join(logDir, baseName + '.log');
    stream = fs.createWriteStream(currentFile, { flags: 'a' });
  }
  const monitor = setInterval(() => {
    if (fs.existsSync(currentFile) && fs.statSync(currentFile).size >= maxSize) {
      rotate();
    }
  }, 20000);
  return {
    log: function(msg) {
      const line = new Date().toISOString() + ' [LOG] ' + msg + '\n';
      stream.write(line);
      console.log(line.trim());
    },
    error: function(msg) {
      const line = new Date().toISOString() + ' [ERR] ' + msg + '\n';
      stream.write(line);
      console.error(line.trim());
    },
    forceRotate: rotate,
    shutdown: function() {
      clearInterval(monitor);
      stream.end();
    }
  };
}
module.exports = { setupLogger };