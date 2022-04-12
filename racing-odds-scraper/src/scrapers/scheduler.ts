import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { SchedulePage } from "./pages/schedule-page";
import { EventSchedule } from "./scraper-types";

type Limits = {
  allowedCountries: string[],
  allowedVenues: string[],
  activeTime: { start: number, end: number },
  isStrict: boolean,
};

export class Scheduler {
  private mainBrowser: Browser;
  private sourceSchedulePages: SchedulePage[] = [];

  private isSouping = false;
  desiredPollIntervalInSec = 30;

  readingLimits: Limits = {
    allowedCountries: [],
    allowedVenues: [],
    activeTime: {
      start: 0,
      end: 24
    },
    isStrict: false,
  };
  
  soupedSchedules: { [key: string]: EventSchedule } = {};
  
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
  }

  async startSoupingSources() {
    if (this.isSouping) 
      throw new Error("Scheduler is already souping.");

    const updateSoup = async () => {
      const unformattedSoupSchedules = this.sourceSchedulePages.map(async ssp => {
        return { [ssp.sourceUrl.hostname]: await ssp.getVenueNamesToEvents() };
      });
      this.soupedSchedules = (await Promise.all(unformattedSoupSchedules)).reduce((ss, uss) => ({ ...ss, ...uss }), {});
    }

    updateSoup();
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      updateSoup();
    }, desiredPollIntervalInMs)

    this.isSouping = true;
  }

  getUpcomingEventLinks() {
    const oneHrInFut = new Date();
    const formattedOneMinInFut = parseInt(`${(oneHrInFut.getHours() + 1 + 1)}${(oneHrInFut.getMinutes())}`);
    
    let links: string[] = [];
    for (const hostKey in this.soupedSchedules) {
      for (const venueKey in this.soupedSchedules[hostKey]) { 
        for (const event of this.soupedSchedules[hostKey]![venueKey]!) {
          const eventTime = parseInt(event.time.replace(":", ""));
          if (eventTime < formattedOneMinInFut) { 
            links.push(event.link);
          }
        }
      }
    }

    return links;
  }
}