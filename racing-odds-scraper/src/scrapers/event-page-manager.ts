import { wrappedTryCatch } from "src/utils";
import { Browser } from "./browsers/browser";
import { EventPage } from "./pages/event-page";

export class EventPageManager {
  private mainBrowser: Browser;

  coveredEvents: { [key: string]: { [key: string]: EventPage } } = {};

  async initBrowser() {
    this.mainBrowser = new Browser(await puppeteer.launch());
  }

  addEventPage(eventName: string, bookieName: string, eventPage: EventPage) {
    if (!this.coveredEvents[eventName]) {
      console.log("A new event key was inserted into event page manager.");
      this.coveredEvents[eventName] = {};
    }
  }
}