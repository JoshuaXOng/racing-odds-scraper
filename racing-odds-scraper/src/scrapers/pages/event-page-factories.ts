import { bookiesToUrls } from "../../../src/constants";
import { EventPage } from "./event-page";
import { BetfairRacingEventPage } from "./racing-event-pages/betfair-racing-event-page";

export interface EventPageFactory {
  createEventPage(sourceUrl: URL): EventPage;
}

export class RacingEventPageFactory implements EventPageFactory {
  createEventPage(sourceUrl: URL) {
    switch (sourceUrl.hostname) {
      case new URL(bookiesToUrls.betfair.index).hostname:
        return new BetfairRacingEventPage(sourceUrl);
      default:
        throw new Error("There ain't no bookie event page type matching that host name.");
    }
  }
}
