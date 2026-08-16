const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logDir, maxSize, maxFiles) {
        this.logDir = logDir;
        this.maxSize = maxSize;
        this.maxFiles = maxFiles;
        this.currentLogFile = path.join(logDir, 'log.txt');
        this.initLogDir();
    }

    initLogDir() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(message) {
        this.checkLogSize();
        const timestamp = new Date().toISOString();
        fs.appendFileSync(this.currentLogFile, `${timestamp} - ${message}\n`);
    }

    checkLogSize() {
        const stats = fs.statSync(this.currentLogFile);
        if (stats.size >= this.maxSize) {
            this.rotateLogs();
        }
    }

    rotateLogs() {
        for (let i = this.maxFiles - 1; i > 0; i--) {
            const srcPath = path.join(this.logDir, `log.${i - 1}.txt`);
            const destPath = path.join(this.logDir, `log.${i}.txt`);
            if (fs.existsSync(srcPath)) {
                fs.renameSync(srcPath, destPath);
            }
        }
        fs.renameSync(this.currentLogFile, path.join(this.logDir, 'log.0.txt'));
    }
}

module.exports = Logger;