class Logger {
    constructor() {
        this.logs = [];
    }

    info(message) {
        this.logs.push({ level: 'INFO', message, timestamp: new Date() });
        console.log(`[INFO] ${message}`);
    }

    error(message) {
        this.logs.push({ level: 'ERROR', message, timestamp: new Date() });
        console.error(`[ERROR] ${message}`);
    }

    getLogs() {
        return this.logs;
    }
}

const logger = new Logger();

const retryOperation = async (operation, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await operation();
            logger.info(`Operation succeeded on attempt ${i + 1}`);
            return result;
        } catch (error) {
            logger.error(`Attempt ${i + 1} failed: ${error.message}`);
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw new Error('All attempts failed');
            }
        }
    }
};

export { logger, retryOperation };