import { Page } from "../browsers/page";
import { Venue } from "../scraper-types";

export abstract class EventPage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  getVenue(): Venue {
    return {
      name: "name",
      countryName: "name",
    };
  };

  abstract getEventName();

  getEventStartTime(): string {
    return "202204140115";
  };

  abstract getContestantNames();

  abstract getContestantNamesToOdds();

  abstract getIsEventInPlay();
  abstract getIsEventSuspended();
  abstract getHasEventEnded();
}
