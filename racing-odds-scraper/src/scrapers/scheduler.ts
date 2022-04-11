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
  private sourceSchedulePages: SchedulePage[] = [];
  
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
  
  soupedSchedules: { [key: string]: Schedule };
  
  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch());
  }

  async addSourcePage(schedulePage: SchedulePage) {
    if (!this.mainBrowser)
      throw new Error("Have to init browser before running.");
    
    const isSourceDoubleUp = this.sourceSchedulePages.reduce((_, ssp) => schedulePage instanceof ssp.constructor, false);
    if (isSourceDoubleUp) {
      return console.log("Scheduler was given a duplicate source page.");
    }

    const addPageResult = await this.mainBrowser.addPage(schedulePage);
    if (!addPageResult) {
      throw new Error("Setup failed as page could not be added to browser.");
    }

    this.sourceSchedulePages.push(schedulePage);
  
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      const unformattedSoupSchedules = this.sourceSchedulePages.map(async ssp => {
        return { [ssp.sourceUrl.toString()]: await ssp.getVenueNamesToEvents() };
      });
      this.soupedSchedules = (await Promise.all(unformattedSoupSchedules)).reduce((ss, uss) => ({ ...ss, ...uss }), {});
    }, desiredPollIntervalInMs)
  }
}