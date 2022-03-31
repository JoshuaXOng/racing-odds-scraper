import { Page } from "./page";

export abstract class SchedulePage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract venuesName();

  abstract venuesToEventsMap();
}