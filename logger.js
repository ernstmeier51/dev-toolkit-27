class Logger {
    constructor() {
        this.logs = [];
        this.performanceStart = performance.now();
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ timestamp, message });
        console.log(`[${timestamp}] ${message}`);
        this.optimizePerformance();
    }

    optimizePerformance() {
        const elapsedTime = performance.now() - this.performanceStart;
        if (this.logs.length > 100 || elapsedTime > 5000) {
            this.flushLogs();
        }
    }

    flushLogs() {
        // Pretend to send logs to a logging server
        console.info('Flushing logs to server:', this.logs);
        this.logs = [];
        this.performanceStart = performance.now();
    }
}

const logger = new Logger();
logger.log('This is a test log.');
logger.log('Another log entry.');

export default logger;