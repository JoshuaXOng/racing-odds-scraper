import { Page as PPage } from "puppeteer";
import { RacingEventPage } from "../racing-event-page";

export abstract class BetfairRacingEventPage extends RacingEventPage {
  constructor(page: PPage) {
    super(page);
  }

  contestantsName() {};

  contestantsToHorseMap() {};

  contestantsToOddsMap() {};
}