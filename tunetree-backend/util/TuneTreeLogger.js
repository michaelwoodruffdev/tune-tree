"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TuneTreeLogger {
    constructor() {
        this.mainLogFile = process.env.MAIN_LOG_FILE;
    }
    logRequest(date, ip, route) {
        console.log(`${ip} (${date.toLocaleDateString()} - ${date.toLocaleTimeString()}): ${route}`);
    }
}
exports.default = TuneTreeLogger;
