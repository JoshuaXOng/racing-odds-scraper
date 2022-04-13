import Fuse from "fuse.js";
import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { EventPage } from "./pages/event-page";
import { RacingEventPageFactory } from "./pages/event-page-factories";
import { SchedulerObserver } from "./scheduler";

const initialFuzeCollection: string[] = [];
const fuse = new Fuse(initialFuzeCollection, { shouldSort: true, includeScore: true });

export class EventPageManager implements SchedulerObserver {
  private mainBrowser: Browser;

  private isSouping = false;
  desiredPollIntervalInSec = 5;

  coveredEventPages: EventPage[] = [];
  soupedEvents: { [key: string]: { [key: string]: any } } = {};

  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch());
  }

  async addEventPage(eventPage: EventPage) {
    if (!this.mainBrowser)
      throw new Error("Have to init browser before running.");

    const isAddPageSucc = await this.mainBrowser.addPage(eventPage);
    if (!isAddPageSucc)
      throw new Error("Page could not be added to the driver browser.");
    
    this.coveredEventPages.push(eventPage);
  }

  async startSoupingEvents() { 
    if (this.isSouping) 
      throw new Error("Scheduler is already souping.");

    const updateSoup = async () => {
      this.coveredEventPages.forEach(async cep => {
        const cepEventName = await cep.getEventName();

        const coveredEventNames = Object.keys(this.soupedEvents);
        fuse.setCollection(coveredEventNames);
        const bestEventMatchScore = fuse.search(cepEventName)[0]?.score;
        if (
          !coveredEventNames.includes(cepEventName) &&
          bestEventMatchScore && bestEventMatchScore < 0.20
        ) {
          console.log("Potential miss-shot in event page manager key insertion.")
        }

        if (!this.soupedEvents[cepEventName])
          this.soupedEvents[cepEventName] = {};
        this.soupedEvents[cepEventName]![cep.sourceUrl.hostname] = await cep.getContestantNamesToOdds();

        //
        // Tab clean up.
        // - Two timers that use a driver page and close it cannot co-exist
        // - Serial nature will race-condition and bloop out
        //        

        const cepLength = this.coveredEventPages.length;
    
        for (let index = 0; index < cepLength; index++) {
          const sourcePage = this.coveredEventPages[cepLength-index-1];
          const canClose = await sourcePage?.getHasEventEnded();
          if (canClose) {
            this.coveredEventPages.splice(cepLength-index-1, 1);
            await sourcePage!.close();
          }
        }
      });
    }

    await updateSoup();
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      await updateSoup();
    }, desiredPollIntervalInMs)
    
    this.isSouping = true;
  }

  //
  // SchedulerObserver Implementation.
  //

  async onAddedToScheduleObservers(eventLinks: string[]) {
    const newEventLinks = this.filterNewEventLinks(eventLinks);
    await Promise.all(newEventLinks.map(nel => this.addEventPage((new RacingEventPageFactory()).createEventPage(new URL(nel)))));
  }

  async onScheduleSouped(eventLinks: string[]) {
    const newEventLinks = this.filterNewEventLinks(eventLinks);
    await Promise.all(newEventLinks.map(nel => this.addEventPage((new RacingEventPageFactory()).createEventPage(new URL(nel)))));
  }

  private filterNewEventLinks(eventLinks: string[]) {
    const coveredEventLinks = this.coveredEventPages.map(cep => cep.sourceUrl.toString());
    const newEventLinks = eventLinks.filter(el => !coveredEventLinks.includes(el));
    return newEventLinks;
  }
}

export interface EventObserver {

}