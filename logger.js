const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logDir, maxSize, maxFiles) {
        this.logDir = logDir || 'logs';
        this.maxSize = maxSize || 1024 * 1024; // 1MB
        this.maxFiles = maxFiles || 5;
        this.currentLogFile = path.join(this.logDir, 'app.log');

        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(this.currentLogFile, logMessage);
        this.checkLogFile();
    }

    checkLogFile() {
        const stats = fs.statSync(this.currentLogFile);
        if (stats.size >= this.maxSize) {
            this.rotateLogFile();
        }
    }

    rotateLogFile() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const newLogFile = path.join(this.logDir, `app-${timestamp}.log`);
        fs.renameSync(this.currentLogFile, newLogFile);

        const files = fs.readdirSync(this.logDir)
            .filter(file => file.startsWith('app-'))
            .sort();

        while (files.length > this.maxFiles) {
            fs.unlinkSync(path.join(this.logDir, files.shift()));
        }
        fs.writeFileSync(this.currentLogFile, '');
    }
}

module.exports = Logger;