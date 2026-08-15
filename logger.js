// Logger Utility to Optimize Performance

const logLevels = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
};

let logs = [];

function log(level, message) {
    const timestamp = new Date().toISOString();
    logs.push({ timestamp, level, message });
    if (logs.length > 100) {
        logs.shift(); // Keep only the last 100 logs
    }
}

function getLogs() {
    return logs.slice(); // Return a copy of logs
}

function clearLogs() {
    logs = [];
}

function getLastLog() {
    return logs[logs.length - 1] || null;
}

module.exports = {
    logLevels,
    log,
    getLogs,
    clearLogs,
    getLastLog
};