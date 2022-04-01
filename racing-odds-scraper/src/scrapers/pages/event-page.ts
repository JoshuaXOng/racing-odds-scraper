import { Page } from "../browsers/page";

export abstract class EventPage extends Page {
  constructor(url: URL) {
    super(url);
  }

  abstract contestantNames();
  
  abstract contestantNamesToOddsMap();

  // abstract hasEventStarted();
  // abstract isEventInPlay();
  // abstract isEventSuspended();
  // abstract hasEventEnded();
}