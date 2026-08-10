const fs = require('fs');
const path = require('path');

class ConfigLoader {
    constructor(defaults) {
        this.defaults = defaults;
        this.config = {};
    }

    loadConfig(filePath) {
        const fullPath = path.resolve(filePath);
        if (fs.existsSync(fullPath)) {
            const userConfig = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            this.config = { ...this.defaults, ...userConfig };
        } else {
            this.config = this.defaults;
        }
        return this.config;
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
    }
}

module.exports = ConfigLoader;