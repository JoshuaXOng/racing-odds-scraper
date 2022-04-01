import { SchedulePage } from "../schedule-page";

const betfairSchedulePageConstants = {
  racing: {
    html: {
      classNames: {
        venueName: "meeting-label" ,
        eventTimeRow: "race-list",
        eventTime: "label",
      }
    }
  }
}

export class BetfairSchedulePage extends SchedulePage {
  constructor(url: URL) {
    super(url);
  }

  async venueNames() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object.");
    } else {
      await this.page.waitForSelector(
        `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`
      )
      
      const venueNames = await this.page.$$eval(
        `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`, 
        elements => elements.map(e => e.innerHTML)
      );
      return venueNames;
    }
  };

  async venueNamesToEventsMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object.");
    } else {
      await this.page.waitForSelector(
        `.${betfairSchedulePageConstants.racing.html.classNames.eventTime}`
      )
      
      const eventTimes = await this.page.$$eval( // Should try more complex query selector.
        `.${betfairSchedulePageConstants.racing.html.classNames.eventTime}`, 
        elements => elements.map(e => e.innerHTML)
      );

      let eventTimeRows: any = [];
      let eventTimeRow: any = [];
      for (let i = 0; i < eventTimes.length; i++) {
        const currentEventTime = new Number(eventTimes[i]!.replace(":", "")) as number;
        const nextEventTime = new Number(eventTimes[i+1]?.replace(":", "") ?? -Infinity) as number;
        
        eventTimeRow.push(currentEventTime)
        if (currentEventTime >= nextEventTime) { // This logic/assumption is incorrect - new row's first element is not always lower than current row's second element.
          eventTimeRows.push(eventTimeRow);
          eventTimeRow = [];
        }
      }
      
      const venueNames = await this.venueNames();
      if (venueNames?.length !== eventTimeRows?.length) {
        console.log(`This function may be incorrect as length of venue name does not match length of event rows: ${venueNames?.length} vs. ${eventTimeRows?.length}`);
      }

      let venueNamesToEventsMap = {};
      venueNames?.forEach((vn, i) => {
        venueNamesToEventsMap[vn] = eventTimeRows[i]
      });
      return venueNamesToEventsMap;
    }
  };
}