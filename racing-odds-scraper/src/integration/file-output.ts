import { EventsObserver } from "../scrapers/event-page-manager";
import { EventPage } from "src/scrapers/pages/event-page";

export class FileOutput implements EventsObserver {
  onEventPagesPolling(eventPages: EventPage[]) {   
  }

  onEventPageClosure(eventPage: EventPage) {
  }
  
  toObject() {
      
  }
}
