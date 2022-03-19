import { OddsRecord, TargetType } from "../odds-record";
import { Venue } from "../venue";

export abstract class Notable {
  private title: string;
  private msg: string;
  private isActive: boolean;
}

type EventParams = {
  predStartDateTime: Date;
  predEndDateTime: Date;
  venue: Venue;
  targetInterval: number;
  targetType: TargetType;
}

export class Event {
  private predStartDateTime: Date;
  private predEndDateTime: Date;
  private actualStartDateTime: Date;
  private actualEndDateTime: Date;
  private venue: Venue;
  private oddsRecord: OddsRecord;
  private notables: Notable[]; 
  private isBettingOpen: boolean;

  constructor({ predStartDateTime, predEndDateTime, venue, targetInterval, targetType }: EventParams) {
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
  
  setActualStartDateTime(start: Date) {
    this.actualStartDateTime = start;  
  }
  setActualEndDateTime(end: Date) {
    this.actualEndDateTime = end;
  }
  setIsBettingOpen(isOpen: boolean) {
    this.isBettingOpen = isOpen;
  }
}