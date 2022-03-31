import { RacingEventPage } from "../racing-event-page";

const betfairRacingEventPageConstants = {
  html: {
    classNames: {
      jockeyName: "jockey-name",
      horseName: "runner-name",
    }
  }
}

export class BetfairRacingEventPage extends RacingEventPage {
  constructor(url: URL) {
    super(url);
  }

  async contestantsName() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object")
    } else {
      await this.page.waitForSelector(
        `.${betfairRacingEventPageConstants.html.classNames.jockeyName}`
      );

      const contestantsName = await this.page.$$eval(
        `.${betfairRacingEventPageConstants.html.classNames.jockeyName}`,
        elements => elements.map(e => e.innerHTML)
      );
      return contestantsName;
    }
  };

  async contestantsToHorseMap() {
    if (!this.page) {
      return console.log("Page is being searched w/o an underlying page object")
    } else {
      await this.page.waitForSelector(
        `.${betfairRacingEventPageConstants.html.classNames.horseName}`
      );

      const horsesNamePlus = await this.page.$$eval(
        `.${betfairRacingEventPageConstants.html.classNames.horseName}`,
        elements => elements.map(e => e.innerHTML)
      );
      const horsesName = horsesNamePlus.map(cnp => cnp.slice(0, cnp.indexOf("<")));

      const contestantsName = await this.contestantsName();

      let contestantsToHorseMap = {};
      contestantsName?.forEach((cn, i) => {
        contestantsToHorseMap[cn] = horsesName[i]
      });
      return contestantsToHorseMap;
    }
  };

  async contestantsToOddsMap() {};
}