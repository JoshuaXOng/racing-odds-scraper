import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { SchedulePage } from "./pages/schedule-page";

type Limits = {
  allowedCountries: string[],
  allowedVenues: string[],
  activeTime: { start: number, end: number },
  isStrict: boolean,
};

export class Scheduler {
  private mainBrowser: Browser;
  private sourceSchedulePage: SchedulePage;
  
  // desiredPollIntervalInSec = 60 * 60;
  desiredPollIntervalInSec = 1;
  readingLimits: Limits = {
    allowedCountries: [],
    allowedVenues: [],
    activeTime: {
      start: 0,
      end: 24
    },
    isStrict: false,
  };

  testi: any[] = [];
  
  async setupAndRun(schedulePage: SchedulePage) {
    this.mainBrowser = new Browser(await puppeteer.launch());

    this.sourceSchedulePage = schedulePage;
    const addPageResult = await this.mainBrowser.addPage(this.sourceSchedulePage);

    if (!addPageResult) {
      throw new Error("Setup failed as page could not be added to browser.");
    }
    console.log("333")
    // const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      console.log(await this.sourceSchedulePage.venueNamesToEventsMap())
    }, 1)
    console.log("333")
  }

  pollUpcomingEvents() {
    console.log(this.testi)
  }
}