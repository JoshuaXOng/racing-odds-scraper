import { Page } from "../browsers/page";
import { EventSchedule } from "../scraper-types";

export class SchedulePageError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export abstract class SchedulePage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getVenueNames(): Promise<string[]>;

  abstract getVenueNamesToEvents(): Promise<EventSchedule>;
}
