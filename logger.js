class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        if (typeof message === 'string' && message.trim() !== '') {
            const timestamp = new Date().toISOString();
            this.logs.push(`[${timestamp}] ${message}`);
            console.log(this.logs[this.logs.length - 1]);
        } else {
            console.error('Invalid log message. Must be a non-empty string.');
        }
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

const logger = new Logger();

// Example usage in the main processing loop
function mainLoop() {
    for (let i = 0; i < 5; i++) {
        logger.log(`Iteration ${i}`);
        // Simulating a scenario with potential invalid log entries
        logger.log(' '); // Invalid log
    }
    console.log('All logs:', logger.getLogs());
}
mainLoop();