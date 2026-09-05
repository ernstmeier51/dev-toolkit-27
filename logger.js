const fs = require('fs');
const path = require('path');

class RotatorLogger {
  constructor(limit = 150) {
    this.dir = path.join(process.cwd(), 'click-logs');
    this.limit = limit;
    this.count = 0;
    this.activeFile = '';
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }
    this.cycle();
  }

  cycle() {
    this.activeFile = path.join(this.dir, `session_${Date.now()}.log`);
    this.count = 0;
    const files = fs.readdirSync(this.dir).map(f => path.join(this.dir, f));
    if (files.length > 3) {
      files.sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs);
      try {
        fs.unlinkSync(files[0]);
      } catch (err) {
        // Silently handle busy file locks
      }
    }
  }

  write(level, msg) {
    if (this.count >= this.limit) {
      this.cycle();
    }
    const payload = `[${new Date().toISOString()}] [${level}] ${msg}\n`;
    try {
      fs.appendFileSync(this.activeFile, payload);
      this.count++;
    } catch (err) {
      process.stderr.write(`Failed to write to log: ${err.message}\n`);
    }
  }
}

const instance = new RotatorLogger();
const intercept = (method, level) => {
  const original = console[method];
  console[method] = (...args) => {
    instance.write(level, args.join(' '));
    original.apply(console, args);
  };
};

intercept('log', 'INFO');
intercept('warn', 'WARN');
intercept('error', 'ERROR');

module.exports = instance;