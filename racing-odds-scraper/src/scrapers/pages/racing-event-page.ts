import { EventPage } from "./event-page";

export abstract class RacingEventPage extends EventPage {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  abstract getContestantNamesToHorseNames();
}