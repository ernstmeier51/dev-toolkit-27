const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logDir) {
        this.logDir = logDir;
        this.logFile = path.join(logDir, 'app.log');
        this.maxSize = 5 * 1024 * 1024; // 5 MB
    }

    log(message) {
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        this.rotateLogs();
        fs.appendFileSync(this.logFile, logMessage);
    }

    rotateLogs() {
        const stats = fs.existsSync(this.logFile) ? fs.statSync(this.logFile) : null;
        if (stats && stats.size >= this.maxSize) {
            const archivedFile = path.join(this.logDir, `app_${Date.now()}.log`);
            fs.renameSync(this.logFile, archivedFile);
        }
    }
}

module.exports = Logger;
