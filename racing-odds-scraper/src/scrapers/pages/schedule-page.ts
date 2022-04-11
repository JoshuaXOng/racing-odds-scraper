import { Page } from "../browsers/page";
import { EventSchedule } from "../scraper-types";

export abstract class SchedulePage extends Page {
  abstract sourceBookieName: string;
  
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getVenueNames();

  abstract getVenueNamesToEvents(): Promise<EventSchedule>;
}