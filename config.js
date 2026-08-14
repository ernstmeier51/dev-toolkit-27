const fs = require('fs');
const path = require('path');

const defaultConfig = {
    interval: 1000,
    repetitions: 10,
    clickCoordinates: {
        x: 0,
        y: 0
    },
    logLevel: 'info'
};

function loadConfig(customConfigPath) {
    let config = {...defaultConfig};
    try {
        const customConfig = fs.readFileSync(customConfigPath, 'utf-8');
        const parsedConfig = JSON.parse(customConfig);
        config = {...config, ...parsedConfig};
    } catch (error) {
        console.warn('Loading custom config failed, using defaults:', error);
    }
    return config;
}

module.exports = { loadConfig };