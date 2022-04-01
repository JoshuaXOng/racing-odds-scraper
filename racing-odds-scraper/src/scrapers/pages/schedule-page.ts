import { Page } from "../browsers/page";

export abstract class SchedulePage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract venueNames();

  abstract venueNamesToEventsMap();

  // abstract venueNamesToFilteredEventsMap(predicate: (venueName: string, eventTime: string) => boolean);
}