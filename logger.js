class Logger {
    constructor() {
        this.logs = [];
    }
    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
        console.log(this.logs[this.logs.length - 1]);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = [];
    }
}

const logger = new Logger();

// Usage example:
logger.log('Application started.');
logger.log('An error occurred.');
console.log(logger.getLogs());
logger.clearLogs();
console.log(logger.getLogs());