import { Page as PPage } from "puppeteer";
import { Page } from "./page";

export abstract class SchedulePage extends Page {
  constructor(page: PPage) {
    super(page);
  }

  abstract venuesName();

  abstract venuesToEventsMap();
}