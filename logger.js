class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        if (this.validateInput(message)) {
            this.logs.push({ timestamp: new Date(), message });
        } else {
            console.error('Invalid log message');
        }
    }

    validateInput(input) {
        return typeof input === 'string' && input.trim() !== '';
    }

    getLogs() {
        return this.logs;
    }
}

const logger = new Logger();

// Example usage
logger.log('User clicked button');
logger.log(''); // This will be rejected
console.log(logger.getLogs());