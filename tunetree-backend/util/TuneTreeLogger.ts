class TuneTreeLogger {
    mainLogFile: string;

    constructor() {
        this.mainLogFile = process.env.MAIN_LOG_FILE!;
    }
    
    logRequest(date: Date, ip: string, route: string) : void{
        console.log(`${ip} (${date.toLocaleDateString()} - ${date.toLocaleTimeString()}): ${route}`);
    }
}

export default TuneTreeLogger;
