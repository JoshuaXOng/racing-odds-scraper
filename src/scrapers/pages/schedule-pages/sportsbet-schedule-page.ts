// import { bookiesToUrls } from "../../../constants";
import { SchedulePage, SchedulePageError } from "../schedule-page";

const sportsbetSchedulePageConstants = {
  racing: {
    html: {
      classNames: {
        eventsTable: "content_f6hdapv",
        venueName: "meetingName_f1jzu4qi",
        scheduleRow: "lastRowDesktop_fuox3c8",
        unfinishedEvent: "notResultedEventCell_fsnbnzf",
      },
    },
  },
};

export class SportsBetSchedulePage extends SchedulePage {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  async getVenueNames() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${sportsbetSchedulePageConstants.racing.html.classNames.eventsTable}`);

    const venueNames = await this.driverPage.$$eval(`.${sportsbetSchedulePageConstants.racing.html.classNames.venueName}`, (venueNames) =>
      venueNames.map((vn) => vn.innerHTML.toLowerCase())
    );
    return venueNames;
  }

  async getVenueNamesToEvents() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${sportsbetSchedulePageConstants.racing.html.classNames.unfinishedEvent}`);

    const formattedVrNames = await this.getVenueNames();

    const formattedVrEvents = await this.driverPage.$$eval(`.${sportsbetSchedulePageConstants.racing.html.classNames.scheduleRow}`, (venueRows) => {  
      return venueRows.map(vr => {
        const now = new Date();
        const nowYYYY = now.getFullYear().toString();
        const nowMM = (now.getMonth() + 1).toString().padStart(2, "0");
        const nowDD = now.getDate().toString().padStart(2, "0");

        let vrEvents: { link: string | null, time: string }[] = [];
        for (let i = 1; i < vr.children.length; i++) {
          vrEvents.push({
            link: vr.children[0]!.getAttribute("href"),
            time: `${nowYYYY}${nowMM}${nowDD}${vr.innerHTML.replace(":", "")}`,
          })
        }
        
        return vrEvents;
      })
    });

    if (formattedVrNames.length !== formattedVrEvents.length)
      throw new SchedulePageError("Number of read venue location names do not match rows of data");

    let venueNamesToEvents = {};
    for (let index of formattedVrNames.keys()) {
      const venueName = formattedVrNames[index]!;
      const venueEvents = formattedVrEvents[index];

      venueNamesToEvents = { ...venueNamesToEvents, [venueName]: venueEvents };
    }

    return venueNamesToEvents;
  }
}
