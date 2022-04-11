import { Page } from "../browsers/page";

export abstract class EventPage extends Page {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getContestantNames();
  
  abstract getContestantNamesToOdds();

  abstract getIsEventInPlay();
  abstract getIsEventSuspended();
  abstract getHasEventEnded();
}