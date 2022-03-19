import { OddsRecord } from "../odds-record";
export class Notable {
}
export class Event {
    constructor({ predStartDateTime, predEndDateTime, venue, targetInterval, targetType }) {
        this.predStartDateTime = predStartDateTime;
        this.predEndDateTime = predEndDateTime;
        this.venue = venue;
        this.oddsRecord = new OddsRecord(targetInterval, targetType);
    }
    getPredStartDateTime() {
        return this.predStartDateTime;
    }
    getPredEndDateTime() {
        return this.predEndDateTime;
    }
    getActualStartDateTime() {
        return this.actualStartDateTime;
    }
    getActualEndDateTime() {
        return this.actualEndDateTime;
    }
    getVenue() {
        return this.venue;
    }
    getOddsRecord() {
        return this.oddsRecord;
    }
    getIsBettingOpen() {
        return this.isBettingOpen;
    }
    setActualStartDateTime(start) {
        this.actualStartDateTime = start;
    }
    setActualEndDateTime(end) {
        this.actualEndDateTime = end;
    }
    setIsBettingOpen(isOpen) {
        this.isBettingOpen = isOpen;
    }
}
//# sourceMappingURL=event.js.map