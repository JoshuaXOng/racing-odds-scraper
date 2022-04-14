import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { SchedulePage } from "./pages/schedule-page";
import { EventSchedule } from "./scraper-types";

type Limits = {
  allowedCountries: string[];
  allowedVenues: string[];
  activeTime: { start: number; end: number };
  isStrict: boolean;
};

export class Scheduler {
  private mainBrowser: Browser;
  private sourceSchedulePages: SchedulePage[] = [];

  private isSouping = false;
  private desiredPollIntervalInSec = 5;
  upcomingThresholdInMin = 30;

  readingLimits: Limits = {
    allowedCountries: [],
    allowedVenues: [],
    activeTime: {
      start: 0,
      end: 24,
    },
    isStrict: false,
  };

  soupedSchedules: { [key: string]: EventSchedule } = {};

  private schedulerObservers: SchedulerObserver[] = [];

  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch());
  }

  async addSourcePage(schedulePage: SchedulePage) {
    if (!this.mainBrowser) throw new Error("Have to init browser before running.");

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
    if (this.isSouping) throw new Error("Scheduler is already souping.");

    await this.updateSoup();
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      await this.updateSoup();
    }, desiredPollIntervalInMs);

    this.isSouping = true;
  }

  getUpcomingEventLinks(hoursAhead: number, minutesAhead: number) {
    const future = new Date();
    future.setHours(future.getHours() + hoursAhead);
    future.setMinutes(future.getMinutes() + minutesAhead);

    const futureYYYY = `${future.getFullYear()}`;
    const futureMM = `${future.getMonth() + 1}`.padStart(2, "0");
    const futureDD = `${future.getDate()}`.padStart(2, "0");
    const futureHH = `${future.getHours()}`.padStart(2, "0");
    const futureMm = `${future.getMinutes()}`.padStart(2, "0");
    const formattedFuture = parseInt(`${futureYYYY}${futureMM}${futureDD}${futureHH}${futureMm}`);

    let eventLinks: string[] = [];
    for (const hostKey in this.soupedSchedules) {
      for (const venueKey in this.soupedSchedules[hostKey]) {
        for (const event of this.soupedSchedules[hostKey]![venueKey]!) {
          if (parseInt(event.time) < formattedFuture) eventLinks.push(event.link);
        }
      }
    }

    return eventLinks;
  }

  addScheduleObserver(observer: SchedulerObserver) {
    this.schedulerObservers.push(observer);

    const upcomingEventLinks = this.getUpcomingEventLinks(0, this.upcomingThresholdInMin);
    observer.onAddedToScheduleObservers(upcomingEventLinks);
  }

  private async updateSoup() {
    const unformattedSoupSchedules = this.sourceSchedulePages.map(async (ssp) => {
      return { [ssp.sourceUrl.hostname]: await ssp.getVenueNamesToEvents() };
    });
    this.soupedSchedules = (await Promise.all(unformattedSoupSchedules)).reduce((ss, uss) => ({ ...ss, ...uss }), {});

    const upcomingEventLinks = this.getUpcomingEventLinks(0, this.upcomingThresholdInMin);
    this.schedulerObservers.forEach(async (so) => await so.onScheduleSouped(upcomingEventLinks));
  }
}

export interface SchedulerObserver {
  onAddedToScheduleObservers(eventLinks: string[]);
  onScheduleSouped(eventLinks: string[]);
}
