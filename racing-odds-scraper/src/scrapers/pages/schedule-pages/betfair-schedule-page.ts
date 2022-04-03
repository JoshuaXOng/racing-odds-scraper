import { SchedulePage } from "../schedule-page";

const betfairSchedulePageConstants = {
  racing: {
    html: {
      classNames: {
        venueName: "meeting-label" ,
        eventBoxRow: "race-list",
        eventBox: "race-information",
        eventBoxLink: "race-link",
        eventBoxTime: "label",
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
        venueNames => venueNames.map(vn => vn.innerHTML)
      );
      return venueNames;
    }
  };

  async venueNamesToEventsMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object.");
    } else {
      await this.page.waitForSelector(
        `.${betfairSchedulePageConstants.racing.html.classNames.eventBoxTime}`
      )

      const venueGroupedEvents = await this.page.$$eval( 
        `.${betfairSchedulePageConstants.racing.html.classNames.eventBoxRow}`, 
        eventBoxRows => eventBoxRows.map(ebr => {
          let events: any = [];

          for (let i = 0; i < ebr.children.length; i++) {
            const box = ebr.children.item(i)!;
            events.push({
              link: box.children.item(0)?.getAttribute("href"),
              time: box.children.item(0)?.children.item(0)?.innerHTML
            })
          }

          return events;
        })
      );
      
      const venueNames = await this.venueNames();
      if (venueNames?.length !== venueGroupedEvents?.length) 
        console.log(`This function may be incorrect as length of venue names does not match length of event groups: ${venueNames?.length} vs. ${venueGroupedEvents?.length}`);
      
      let venueNamesToEventsMap = {};
      venueNames?.forEach((vn, i) => venueNamesToEventsMap[vn] = venueGroupedEvents[i]);
      return venueNamesToEventsMap;
    }
  };
}