import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { SchedulePage } from "./pages/schedule-page";
import { Schedule } from "./scraper-types";

type Limits = {
  allowedCountries: string[],
  allowedVenues: string[],
  activeTime: { start: number, end: number },
  isStrict: boolean,
};

export class Scheduler {
  private mainBrowser: Browser;
  private sourceSchedulePage: SchedulePage;
  
  desiredPollIntervalInSec = 5;
  readingLimits: Limits = {
    allowedCountries: [],
    allowedVenues: [],
    activeTime: {
      start: 0,
      end: 24
    },
    isStrict: false,
  };

  schedule: Schedule;
  
  async setupAndRun(schedulePage: SchedulePage) {
    this.mainBrowser = new Browser(await puppeteer.launch());

    this.sourceSchedulePage = schedulePage;
    const addPageResult = await this.mainBrowser.addPage(this.sourceSchedulePage);

    if (!addPageResult) {
      throw new Error("Setup failed as page could not be added to browser.");
    }
    
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      this.schedule = await this.sourceSchedulePage.venueNamesToEventsMap();
    }, desiredPollIntervalInMs)
  }

  pollUpcomingEvents() {
    // console.log(this.testi)
  }
}