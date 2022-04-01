import { Page } from "../browsers/page";

export abstract class SchedulePage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract venueNames();

  abstract venueNamesToEventsMap();

  abstract 
}