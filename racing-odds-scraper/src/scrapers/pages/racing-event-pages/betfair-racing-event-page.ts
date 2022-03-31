import { RacingEventPage } from "../racing-event-page";

export abstract class BetfairRacingEventPage extends RacingEventPage {
  constructor(url: URL) {
    super(url);
  }

  contestantsName() {};

  contestantsToHorseMap() {};

  contestantsToOddsMap() {};
}