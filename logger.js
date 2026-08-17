class Logger {
    constructor() {
        this.logs = [];
        this.startTime = Date.now();
    }
    log(message) {
        const timestamp = Date.now() - this.startTime;
        this.logs.push({ message, timestamp });
        console.log(`[${timestamp}ms] ${message}`);
    }
    error(message) {
        const timestamp = Date.now() - this.startTime;
        this.logs.push({ message: 'ERROR: ' + message, timestamp });
        console.error(`[${timestamp}ms] ERROR: ${message}`);
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