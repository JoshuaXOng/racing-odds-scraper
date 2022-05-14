import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrls } from "../../../constants";
import { Browser } from "../../browsers/browser";
import { SportsBetSchedulePage } from "./sportsbet-schedule-page";

const sportsbetSchedulePageLogger = new Console({
  stdout: fs.createWriteStream("./test-artifacts/sportsbet-schedule-page-ut.txt"),
});

describe("SportsBetSchedulePage Unit Tests.", () => {
  jest.setTimeout(20000);

  let driverBrowser: PBrowser;
  let browser: Browser;
  let scheduleEventPage: SportsBetSchedulePage;

  beforeAll(async () => {
    driverBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(driverBrowser);

    const racingScheduleUrl = new URL(bookiesToUrls.sportsbet.racing);
    scheduleEventPage = new SportsBetSchedulePage(racingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(scheduleEventPage);
    expect(isAddPageSuccessful).toBe(true);
  });

  afterAll(async () => {
    await scheduleEventPage!.driverPage.setViewport({ width: 1920, height: 1500 });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await scheduleEventPage!.driverPage.screenshot({
      path: "./test-artifacts/sportsbet-schedule-page-ut.jpeg",
      clip: { x: 0, y: 0, width: 1920, height: 1500 },
    });

    await driverBrowser.close();
  });

  // test("SportsBetSchedulePage reads current horse racing venue names.", async () => {
  //   const venueNames = await scheduleEventPage!.getVenueNames();
  //   sportsbetSchedulePageLogger.log(venueNames);
  // });

  test("SportsBetSchedulePage reads current horse racing venue names and their events' time.", async () => {
    const venueNamesToEvents = await scheduleEventPage!.getVenueNamesToEvents();
    sportsbetSchedulePageLogger.log(venueNamesToEvents);
  });
});