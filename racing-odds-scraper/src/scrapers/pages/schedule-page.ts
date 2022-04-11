import { Page } from "../browsers/page";
import { Schedule } from "../scraper-types";

export abstract class SchedulePage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getVenueNames();

  abstract getVenueNamesToEvents(): Promise<Schedule>;
}