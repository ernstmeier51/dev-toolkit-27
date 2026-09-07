const fs = require('fs');
const path = require('path');

const LOG_DIR = './logs';
const MAX_SIZE = 1024 * 1024 * 5;
const MAX_FILES = 3;

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

const rotate = () => {
  for (let i = MAX_FILES - 1; i > 0; i--) {
    const oldFile = path.join(LOG_DIR, `dev-toolkit-${i}.log`);
    const newFile = path.join(LOG_DIR, `dev-toolkit-${i + 1}.log`);
    if (fs.existsSync(oldFile)) fs.renameSync(oldFile, newFile);
  }
  fs.writeFileSync(path.join(LOG_DIR, 'dev-toolkit-1.log'), '');
};

const log = (msg) => {
  const filePath = path.join(LOG_DIR, 'dev-toolkit-1.log');
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '');
  
  const stats = fs.statSync(filePath);
  if (stats.size > MAX_SIZE) rotate();

  const entry = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(filePath, entry);
};

module.exports = { log };