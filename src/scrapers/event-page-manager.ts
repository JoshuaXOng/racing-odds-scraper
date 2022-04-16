import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { EventPage } from "./pages/event-page";
import { RacingEventPageFactory } from "./pages/event-page-factories";
import { SchedulerObserver } from "./scheduler";

export class EventPageManager implements SchedulerObserver {
  private mainBrowser: Browser;

  private isSouping = false;
  private desiredPollIntervalInSec = 5;

  private coveredEventPages: EventPage[] = [];
  private activeEventsObservers: EventsObserver[] = [];

  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch({ args: ['--no-sandbox'] }));
  }

  async addEventPage(eventPage: EventPage) {
    if (!this.mainBrowser) throw new Error("Have to init browser before running.");

    const isAddPageSucc = await this.mainBrowser.addPage(eventPage);
    if (!isAddPageSucc) throw new Error("Page could not be added to the driver browser.");

    this.coveredEventPages.push(eventPage);
  }

  async startSouping() {
    if (this.isSouping) throw new Error("Scheduler is already souping.");
    
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;

    await this.updateSoup();
    setInterval(async () => {
      await this.updateSoup();
    }, desiredPollIntervalInMs);

    this.isSouping = true;
  }

  addEventsObserver(eventsObserver: EventsObserver) {
    this.activeEventsObservers.push(eventsObserver);
  }

  private async updateSoup() {
    const eObserverResults = this.activeEventsObservers.map(eo => eo.onEventPagesPolling(this.coveredEventPages));
    await Promise.all(eObserverResults);

    await this.closeFinishedEventPages();
  }

  private async closeFinishedEventPages() {
    const cepLength = this.coveredEventPages.length;

    for (let index = 0; index < cepLength; index++) {
      const coveredPage = this.coveredEventPages[cepLength - index - 1]!;
      
      const canClosePage = await coveredPage?.getHasEventEnded();
      if (canClosePage) {
        await Promise.all(this.activeEventsObservers.map(async aeo => aeo.onEventPageClosure(coveredPage)));

        this.coveredEventPages.splice(cepLength - index - 1, 1);
        await coveredPage!.close();
      }
    }
  }

  //
  // SchedulerObserver Implementation.
  //

  async onAddedToScheduleObservers(eventLinks: string[]) {
    const newEventLinks = this.filterNewEventLinks(eventLinks);
    await Promise.all(newEventLinks.map((nel) => this.addEventPage(new RacingEventPageFactory().createEventPage(new URL(nel)))));
  }

  async onScheduleSouped(eventLinks: string[]) {
    const newEventLinks = this.filterNewEventLinks(eventLinks);
    await Promise.all(newEventLinks.map((nel) => this.addEventPage(new RacingEventPageFactory().createEventPage(new URL(nel)))));
  }

  private filterNewEventLinks(eventLinks: string[]) {
    const coveredEventLinks = this.coveredEventPages.map((cep) => cep.sourceUrl.toString());
    const newEventLinks = eventLinks.filter((el) => !coveredEventLinks.includes(el));
    return newEventLinks;
  }
}

export interface EventsObserver {
  onEventPagesPolling(eventPages: EventPage[]);
  onEventPageClosure(eventPage: EventPage);
  toObject();
}
