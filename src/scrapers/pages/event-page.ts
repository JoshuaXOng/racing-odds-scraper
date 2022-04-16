import { Page } from "../browsers/page";
import { Venue } from "../scraper-types";

export abstract class EventPage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getVenue(): Promise<Venue>;

  abstract getEventName();

  abstract getEventStartTime(): Promise<string>;

  abstract getContestantNames();

  abstract getContestantNamesToOdds();

  abstract getIsEventInPlay();
  abstract getIsEventSuspended();
  abstract getHasEventEnded();
}
