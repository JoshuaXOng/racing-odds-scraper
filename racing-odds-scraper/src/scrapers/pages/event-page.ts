import { Page } from "../browsers/page";

export abstract class EventPage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract contestantsName();

  abstract contestantsToOddsMap();
}