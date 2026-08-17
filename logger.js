class Logger {
    constructor() {
        this.logs = [];
    }

    info(message) {
        this.logs.push({ type: 'INFO', message, timestamp: new Date() });
        this.printLog('INFO', message);
    }

    warn(message) {
        this.logs.push({ type: 'WARN', message, timestamp: new Date() });
        this.printLog('WARN', message);
    }

    error(message) {
        this.logs.push({ type: 'ERROR', message, timestamp: new Date() });
        this.printLog('ERROR', message);
    }

    printLog(type, message) {
        console.log(`[${type}] ${message}`);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

const logger = new Logger();
module.exports = logger;