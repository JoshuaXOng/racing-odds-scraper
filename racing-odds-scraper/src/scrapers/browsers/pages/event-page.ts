import { Page as PPage } from "puppeteer";
import { Page } from "./page";

export abstract class EventPage extends Page {
  constructor(page: PPage) {
    super(page);
  }

  abstract contestantsName();

  abstract contestantsToOddsMap();
}