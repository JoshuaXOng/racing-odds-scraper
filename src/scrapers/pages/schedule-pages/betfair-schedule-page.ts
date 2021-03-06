import { bookiesToUrls } from "../../../constants";
import { SchedulePage } from "../schedule-page";

const betfairSchedulePageConstants = {
  racing: {
    html: {
      classNames: {
        venueName: "meeting-label",
        eventBoxRow: "race-list",
        eventBox: "race-information",
        eventBoxLink: "race-link",
        eventBoxTime: "label",
      },
    },
  },
};

export class BetfairSchedulePage extends SchedulePage {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  async getVenueNames() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairSchedulePageConstants.racing.html.classNames.venueName}`);

    const venueNames = await this.driverPage.$$eval(`.${betfairSchedulePageConstants.racing.html.classNames.venueName}`, (venueNames) =>
      venueNames.map((vn) => vn.innerHTML.toLowerCase())
    );
    return venueNames;
  }

  async getVenueNamesToEvents() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairSchedulePageConstants.racing.html.classNames.eventBoxTime}`);

    const venueGroupedEvents = await this.driverPage.$$eval(`.${betfairSchedulePageConstants.racing.html.classNames.eventBoxRow}`, (eventBoxRows) =>
      eventBoxRows.map((ebr) => {
        const now = new Date();
        const nowYYYY = now.getFullYear().toString();
        const nowMM = (now.getMonth() + 1).toString().padStart(2, "0");
        const nowDD = now.getDate().toString().padStart(2, "0");

        let events: any = [];
        for (let i = 0; i < ebr.children.length; i++) {
          const eventBox = ebr.children.item(i)!;
          const closestAncestor = eventBox.children.item(0);
          events.push({
            link: closestAncestor?.getAttribute("href"),
            time: `${nowYYYY}${nowMM}${nowDD}${closestAncestor?.children.item(closestAncestor?.children.length - 1)?.innerHTML.replace(":", "")}`,
          });
        }

        return events;
      })
    );

    venueGroupedEvents.forEach((vge, vgeIndex) =>
      vge.forEach((ve, veIndex) => {
        venueGroupedEvents[vgeIndex][veIndex].link = bookiesToUrls.betfair.market + ve.link;
      })
    );

    const venueNames = await this.getVenueNames();
    if (venueNames?.length !== venueGroupedEvents?.length)
      console.log(
        `This function may be incorrect as length of venue names does not match length of event groups: ${venueNames?.length} vs. ${venueGroupedEvents?.length}`
      );

    let venueNamesToEvents = {};
    venueNames?.forEach((vn, i) => (venueNamesToEvents[vn] = venueGroupedEvents[i]));
    return venueNamesToEvents;
  }
}
