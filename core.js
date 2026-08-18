// AutoClicker Data Handler
class AutoClickerData {
    constructor() {
        this.clicks = [];
        this.sessionData = {};
    }

    recordClick(x, y) {
        this.clicks.push({ x, y, timestamp: Date.now() });
    }

    startSession(sessionId) {
        this.sessionData[sessionId] = { clicks: [], startTime: Date.now() };
    }

    endSession(sessionId) {
        if (this.sessionData[sessionId]) {
            this.sessionData[sessionId].endTime = Date.now();
            this.sessionData[sessionId].duration = this.sessionData[sessionId].endTime - this.sessionData[sessionId].startTime;
        }
    }

    getSessionData(sessionId) {
        return this.sessionData[sessionId] || null;
    }

    getAllClicks() {
        return this.clicks;
    }

    clearClicks() {
        this.clicks = [];
    }
}

const autoclickerData = new AutoClickerData();
export default autoclickerData;