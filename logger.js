const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logDir, maxSize, maxFiles) {
        this.logDir = logDir;
        this.maxSize = maxSize;
        this.maxFiles = maxFiles;
        this.currentLogFile = path.join(logDir, 'current.log');
        this.createLogDirectory();
    }

    createLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(this.currentLogFile, logMessage);
        this.checkLogSize();
    }

    checkLogSize() {
        const stats = fs.statSync(this.currentLogFile);
        if (stats.size > this.maxSize) {
            this.rotateLog();
        }
    }

    rotateLog() {
        const date = new Date().toISOString().split('T')[0];
        const newLogFile = path.join(this.logDir, `${date}.log`);
        fs.renameSync(this.currentLogFile, newLogFile);
        this.cleanupOldLogs();
    }

    cleanupOldLogs() {
        const files = fs.readdirSync(this.logDir).filter(file => file.endsWith('.log'));
        if (files.length > this.maxFiles) {
            const oldestFile = files.sort().slice(0, files.length - this.maxFiles);
            oldestFile.forEach(file => fs.unlinkSync(path.join(this.logDir, file)));
        }
    }
}

module.exports = Logger;