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

  async venuesName() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object.");
    } else {
      await this.page.waitForSelector(
        `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`
      )
      
      const venuesName = await this.page.$$eval(
        `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`, 
        elements => elements.map(e => e.innerHTML)
      );
      return venuesName;
    }
  };

  async venuesToEventsMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object.");
    } else {
      await this.page.waitForSelector(
        `.${betfairSchedulePageConstants.racing.html.classNames.eventTime}`
      )
      
      const eventsTime = await this.page.$$eval( // Should try more complex query selector.
        `.${betfairSchedulePageConstants.racing.html.classNames.eventTime}`, 
        elements => elements.map(e => e.innerHTML)
      );

      let eventTimeRows: any = [];
      let eventTimeRow: any = [];
      for (let i = 0; i < eventsTime.length; i++) {
        const currentEventTime = new Number(eventsTime[i]!.replace(":", "")) as number;
        const nextEventTime = new Number(eventsTime[i+1]?.replace(":", "") ?? -Infinity) as number;
        
        eventTimeRow.push(currentEventTime)
        if (currentEventTime >= nextEventTime) { // This logic/assumption is incorrect - new row's first element is not always lower than current row's second element.
          eventTimeRows.push(eventTimeRow);
          eventTimeRow = [];
        }
      }
      
      const venuesName = await this.venuesName();
      if (venuesName?.length !== eventTimeRows?.length) {
        console.log(`This function may be incorrect as length of venue name does not match length of event rows: ${venuesName?.length} vs. ${eventTimeRows?.length}`);
      }

      let venuesToEventsMap = {};
      venuesName?.forEach((vn, i) => {
        venuesToEventsMap[vn] = eventTimeRows[i]
      });
      return venuesToEventsMap;
    }
  };
}