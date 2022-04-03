import { RacingEventPage } from "../racing-event-page";

const betfairRacingEventPageConstants = {
  html: {
    classNames: {
      jockeyName: "jockey-name",
      horseName: "runner-name",
      oddsTableRow: "runner-line",
    }
  }
}

export class BetfairRacingEventPage extends RacingEventPage {
  constructor(url: URL) {
    super(url);
  }

  async contestantNames() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object")
    } else {
      await this.page.waitForSelector(
        `.${betfairRacingEventPageConstants.html.classNames.jockeyName}`
      );

      const contestantNames = await this.page.$$eval(
        `.${betfairRacingEventPageConstants.html.classNames.jockeyName}`,
        jockeyNames => jockeyNames.map(jn => jn.innerHTML)
      );
      return contestantNames;
    }
  };

  async contestantNamesToHorseNamesMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object")
    } else {
      await this.page.waitForSelector(
        `.${betfairRacingEventPageConstants.html.classNames.horseName}`
      );

      const horseNamesPlus = await this.page.$$eval(
        `.${betfairRacingEventPageConstants.html.classNames.horseName}`,
        horseInfoBoxs => horseInfoBoxs.map(hib => hib.innerHTML)
      );
      const horseNames = horseNamesPlus.map(hnp => hnp.slice(0, hnp.indexOf("<")));

      const contestantNames = await this.contestantNames();

      let contestantNamesToHorseNameMap = {};
      contestantNames?.forEach((cn, i) => contestantNamesToHorseNameMap[cn] = horseNames[i]);
      return contestantNamesToHorseNameMap;
    }
  };

  async contestantNamesToOddsMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object")
    } else {
      await this.page.waitForSelector(
        `.${betfairRacingEventPageConstants.html.classNames.oddsTableRow}`
      );

      const oddsRows = await this.page.$$eval(
        `.${betfairRacingEventPageConstants.html.classNames.oddsTableRow}`,
        oddsTableRows => oddsTableRows.map(otr => {
          let row: any = [];

          for (let i = 1; i < otr.children.length; i++) {
            const odds = otr.children.item(i)!;
            row.push({
              value: odds.children.item(0)?.children.item(0)?.children.item(0)?.innerHTML,
              money: odds.children.item(0)?.children.item(0)?.children.item(1)?.innerHTML,
            })
          }

          return row;
        })
      );
        
      const contestantNamesToOddsMap = {};
      const contestantNames = await this.contestantNames();
      contestantNames?.forEach((cn, i) => contestantNamesToOddsMap[cn] = oddsRows[i]);
      return contestantNamesToOddsMap;
    }
  };

  async hasEventStarted() {

  };
  async isEventInPlay() {

  };
  async isEventSuspended() {

  };
  async hasEventEnded() {

  };
  // can bet
}