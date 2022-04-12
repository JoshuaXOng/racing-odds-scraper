import Fuse from "fuse.js";
import puppeteer from "puppeteer";
import { Browser } from "./browsers/browser";
import { EventPage } from "./pages/event-page";

const initialFuzeCollection: string[] = [];
const fuse = new Fuse(initialFuzeCollection, { shouldSort: true, includeScore: true });

export class EventPageManager {
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
    
    const isEventDoubleUp = this.coveredEventPages.reduce((_, cep) => eventPage instanceof cep.constructor, false);
    if (isEventDoubleUp) {
      return console.log("Scheduler was given a duplicate event page.");
    }

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
      });
    }

    updateSoup();
    const desiredPollIntervalInMs = this.desiredPollIntervalInSec * 1000;
    setInterval(async () => {
      updateSoup();
    }, desiredPollIntervalInMs)

    this.isSouping = true;
  }

  // async scrapeEventPage(eventName: string, bookieName: string) {
  //   this.coveredEvents[eventName]![bookieName].
  // }

  // async closedFinishedPages () {}
}