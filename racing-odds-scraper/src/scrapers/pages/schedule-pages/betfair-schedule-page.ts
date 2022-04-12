import { bookiesToUrls } from "../../../constants";
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
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  async getVenueNames() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(
      `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`
    )
    
    const venueNames = await this.driverPage.$$eval(
      `.${betfairSchedulePageConstants.racing.html.classNames.venueName}`, 
      venueNames => venueNames.map(vn => vn.innerHTML.toLowerCase())
    );
    return venueNames;
  };

  async getVenueNamesToEvents() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(
      `.${betfairSchedulePageConstants.racing.html.classNames.eventBoxTime}`
    )

    const venueGroupedEvents = await this.driverPage.$$eval( 
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

    venueGroupedEvents.forEach((vge, vgeIndex) => vge.forEach((ve, veIndex) => {
      venueGroupedEvents[vgeIndex][veIndex].link = bookiesToUrls.betfair.market + ve.link
    }))
    
    const venueNames = await this.getVenueNames();
    if (venueNames?.length !== venueGroupedEvents?.length) 
      console.log(`This function may be incorrect as length of venue names does not match length of event groups: ${venueNames?.length} vs. ${venueGroupedEvents?.length}`);
    
    let venueNamesToEvents = {};
    venueNames?.forEach((vn, i) => venueNamesToEvents[vn] = venueGroupedEvents[i]);
    return venueNamesToEvents;
  };
}