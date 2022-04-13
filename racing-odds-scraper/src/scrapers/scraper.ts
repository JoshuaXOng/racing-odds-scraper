import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { SchedulePage } from "./pages/schedule-page";

export abstract class Scraper {
  protected mainBrowser: Browser;

  protected isSouping = false;

  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch());
  }

  abstract addSourcePage(schedulePage: SchedulePage);

  abstract startSoupingSources();
}
