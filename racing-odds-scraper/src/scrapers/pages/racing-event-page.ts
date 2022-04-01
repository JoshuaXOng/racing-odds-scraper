import { EventPage } from "./event-page";

export abstract class RacingEventPage extends EventPage {
  constructor(url: URL) {
    super(url);
  }

  abstract contestantNames();

  abstract contestantNamesToHorseNamesMap();

  abstract contestantNamesToOddsMap();
}