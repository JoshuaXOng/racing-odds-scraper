import Fuse from "fuse.js";
import { EventPage } from "src/scrapers/pages/event-page";
import { EventsObserver } from "../scrapers/event-page-manager";

const initialFuzeCollection: string[] = [];
const fuse = new Fuse(initialFuzeCollection, { shouldSort: true, includeScore: true });

export class JsonOutput implements EventsObserver {
  soupedEvents: { [key: string]: { [key: string]: { [key: string]: { value: string; money: string }[] } } } = {};

  //
  // EventsObserver Implementation.
  //

  onEventPagesPolling(eventPages: EventPage[]) {
    eventPages.forEach(async (ep) => {
      const eventName = await ep.getEventName();

      const coveredEventNames = Object.keys(this.soupedEvents);
      fuse.setCollection(coveredEventNames);
      const bestEventMatchScore = fuse.search(eventName)[0]?.score;
      if (!coveredEventNames.includes(eventName) && bestEventMatchScore && bestEventMatchScore < 0.2) {
        console.log("Potential miss-shot in event page manager key insertion.");
      }

      if (!this.soupedEvents[eventName]) this.soupedEvents[eventName] = {};
      this.soupedEvents[eventName]![ep.sourceUrl.hostname] = await ep.getContestantNamesToOdds();
    });
  }

  onEventPageClosure(eventPage: EventPage) {
      
  }

  toObject() {
    return this.soupedEvents;
  }
}