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

    const formattedVenueNames = await this.getVenueNames();

    let formattedVrEvents = await this.driverPage.$$eval(`.${sportsbetSchedulePageConstants.racing.html.classNames.scheduleRow}`, (venueRows) => {  
      return venueRows.map(venueRow => {
        const now = new Date();
        const nowYyyy = now.getFullYear().toString();
        const nowMm = (now.getMonth() + 1).toString().padStart(2, "0");
        const nowDd = now.getDate().toString().padStart(2, "0");

        let venueRowEvents: { link: string | null, time: string }[] = [];
        for (let i = 1; i < venueRow.children.length; i++) {
          let venueRowEventText = (venueRow.children[i] as HTMLElement).innerText;

          if (venueRowEventText.includes("m")) {
            const eventStart = new Date(now);
            eventStart.setMinutes(eventStart.getMinutes() + parseInt(venueRowEventText.split(" ")[0]!.replace("m", "")));
            venueRowEventText = `${eventStart.getHours()}:${eventStart.getMinutes()}`;
          } else if (venueRowEventText.includes("s")) {
            const eventStart = new Date(now);
            venueRowEventText = `${eventStart.getHours()}:${eventStart.getMinutes()}`;
          } else if (!venueRowEventText.includes(":"))
            continue;

          venueRowEvents.push({
            link: window.location.origin + venueRow.children[i]!.children[0]!.getAttribute("href"),
            time: `${nowYyyy}${nowMm}${nowDd}${venueRowEventText.replace(":", "")}`,
          })
        }
        
        return venueRowEvents;
      })
    });

    if (formattedVenueNames.length !== formattedVrEvents.length)
      throw new SchedulePageError("Number of read venue location names do not match rows of data");

    let venueNamesToEvents = {};
    for (let index of formattedVenueNames.keys()) {
      const venueName = formattedVenueNames[index]!;
      const venueEvents = formattedVrEvents[index];

      venueNamesToEvents = { ...venueNamesToEvents, [venueName]: venueEvents };
    }

    return venueNamesToEvents;
  }
}
