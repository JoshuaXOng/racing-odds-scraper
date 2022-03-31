import { Page as PPage } from "puppeteer";
import { EventPage } from "./event-page";

export abstract class RacingEventPage extends EventPage {
  constructor(page: PPage) {
    super(page);
  }

  abstract contestantsName();

  abstract contestantsToHorseMap();

  abstract contestantsToOddsMap();
}