import { Page } from "../browsers/page";

export abstract class EventPage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getEventName();

  abstract getContestantNames();
  
  abstract getContestantNamesToOdds();

  abstract getIsEventInPlay();
  abstract getIsEventSuspended();
  abstract getHasEventEnded();
}