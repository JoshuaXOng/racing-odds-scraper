import { OddsRecord } from "./odds/odds-record";
import { Venue } from "./venue";

export class Event {
  venue: Venue;
  scheduledStartTime: string;
  oddsRecords: OddsRecord[];
}