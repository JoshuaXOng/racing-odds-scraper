import { Page } from "../browsers/page";
import { Schedule } from "../scraper-types";

export abstract class SchedulePage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract venueNames();

  abstract venueNamesToEventsMap(): Promise<Schedule>;

  // abstract venueNamesToFilteredEventsMap(predicate: (venueName: string, eventTime: string) => boolean);
}