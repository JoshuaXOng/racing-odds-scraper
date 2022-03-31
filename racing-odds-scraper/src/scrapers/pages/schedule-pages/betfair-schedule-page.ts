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
      
      const eventsTime = await this.page.$$eval(
        `.${betfairSchedulePageConstants.racing.html.classNames.eventTime}`, 
        elements => elements.map(e => e.innerHTML)
      );
      
      let eventTimeRows: any = [];
      for (let i = 0; i < eventsTime.length; i++) {
        let eventTimeRow: any = [];
        const currentEventTime = parseInt(eventsTime[i]!.replace(":", ""));
        const nextEventTime = parseInt(eventsTime[i+1]!.replace(":", ""));
        if (currentEventTime <= nextEventTime) {
          eventTimeRows.push(eventTimeRow);
          eventTimeRow = [];
        } else {
          eventTimeRow.push(currentEventTime)
        }
      }
      
      const venuesName = await this.venuesName();
      if (venuesName?.length !== eventTimeRows?.length)
        console.log("This function may be incorrect as length of venue name does not match length of event rows.");

      let venuesToEventsMap = {};
      venuesName?.forEach((vn, i) => {
        venuesToEventsMap[vn] = eventTimeRows[i]
      });
      return venuesToEventsMap;
    }
  };
}