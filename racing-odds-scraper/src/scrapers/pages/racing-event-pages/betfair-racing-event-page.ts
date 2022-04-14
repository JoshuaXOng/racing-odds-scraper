import { RacingEventPage } from "../racing-event-page";

const betfairRacingEventPageConstants = {
  html: {
    classNames: {
      eventName: "venue-name",
      jockeyName: "jockey-name",
      horseName: "runner-name",
      oddsTableRow: "runner-line",
      status: "market-status-label",
      activeSuspendedAlerts: "suspended-overlay-active",
    },
    text: {
      inPlay: "In-Play",
      closed: "Closed",
    },
  },
};

export class BetfairRacingEventPage extends RacingEventPage {
  constructor(sourceUrl: URL) {
    super(sourceUrl);
  }

  async getVenue() {
    return {
      name: (await this.getEventName()).split(" ")[0]!,
      countryName: "australia"
    };
  }

  async getEventName() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.eventName}`);

    const [eventName] = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.eventName}`, (eventNames) =>
      eventNames.map((en) => en.innerHTML.toLowerCase())
    );

    if (!eventName) throw new Error("Could not find event name.");

    const [eventStartTimeHHMm, ...fraggedEventName] = eventName.split(" ");

    const now = new Date();
    const nowYYYY = now.getFullYear().toString();
    const nowMM = (now.getMonth() + 1).toString().padStart(2, "0");
    const nowDD = now.getDate().toString().padStart(2, "0");
    return `${fraggedEventName.slice(0, fraggedEventName.length - 1).join(" ")} ${nowYYYY}${nowMM}${nowDD}${eventStartTimeHHMm!.replace(":", "")}`;
  }

  async getEventStartTime() {
    return (await this.getEventName()).split(" ").reverse()[0]!
  };

  async getContestantNames() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.jockeyName}`);

    const contestantNames = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.jockeyName}`, (jockeyNames) =>
      jockeyNames.map((jn) => jn.innerHTML.toLowerCase())
    );
    return contestantNames;
  }

  async getContestantNamesToHorseNames() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.horseName}`);

    const horseNamesPlus = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.horseName}`, (horseInfoBoxs) =>
      horseInfoBoxs.map((hib) => hib.innerHTML)
    );
    const horseNames = horseNamesPlus.map((hnp) => hnp.slice(0, hnp.indexOf("<")).toLowerCase());

    const contestantNames = await this.getContestantNames();

    let contestantNamesToHorseNameMap = {};
    contestantNames?.forEach((cn, i) => (contestantNamesToHorseNameMap[cn] = horseNames[i]));
    return contestantNamesToHorseNameMap;
  }

  async getContestantNamesToOdds() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.oddsTableRow}`);

    const oddsRows = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.oddsTableRow}`, (oddsTableRows) =>
      oddsTableRows.map((otr) => {
        let row: any = [];

        for (let i = 1; i < otr.children.length; i++) {
          const odds = otr.children.item(i)!;
          row.push({
            value: odds.children.item(0)?.children.item(0)?.children.item(0)?.innerHTML,
            money: odds.children.item(0)?.children.item(0)?.children.item(1)?.innerHTML,
          });
        }

        return row;
      })
    );

    const contestantNamesToOdds = {};
    const contestantNames = await this.getContestantNames();
    contestantNames?.forEach((cn, i) => (contestantNamesToOdds[cn] = oddsRows[i]));
    return contestantNamesToOdds;
  }

  async getIsEventInPlay() {
    return this.getIsEventStatus((status) => status === betfairRacingEventPageConstants.html.text.inPlay);
  }

  async getIsEventSuspended() {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.eventName}`);

    const activeSuspAlerts = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.activeSuspendedAlerts}`, (activeSuspAlerts) =>
      activeSuspAlerts.map((asa) => asa as HTMLElement)
    );

    return activeSuspAlerts.length === 1;
  }

  async getHasEventEnded() {
    return this.getIsEventStatus((status) => status === betfairRacingEventPageConstants.html.text.closed);
  }

  private async getIsEventStatus(predicate: (status: string) => boolean) {
    this.handleNoDriverPage();

    await this.driverPage.waitForSelector(`.${betfairRacingEventPageConstants.html.classNames.status}`);

    const [status] = await this.driverPage.$$eval(`.${betfairRacingEventPageConstants.html.classNames.status}`, (statuses) => statuses.map((s) => s.innerHTML));

    return predicate(status!);
  }
}
