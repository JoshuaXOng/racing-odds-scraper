import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrls } from "../../../constants";
import { Browser } from "../../browsers/browser";
import { BetfairSchedulePage } from "./betfair-schedule-page";

const bfSchedulePageLogger = new Console({
  stdout: fs.createWriteStream("./test-artifacts/betfair-schedule-page-ut.txt")
});

describe("BetfairSchedulePage Unit Tests.", () => {
  jest.setTimeout(20000);

  let driverBrowser: PBrowser;
  let browser: Browser;
  let scheduleEventPage: BetfairSchedulePage;

  beforeAll(async () => {
    driverBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(driverBrowser);
    
    const racingScheduleUrl = new URL(bookiesToUrls.betfair.racing);
    scheduleEventPage = new BetfairSchedulePage(racingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(scheduleEventPage);
    expect(isAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    await scheduleEventPage!.driverPage.setViewport({ width: 1920, height: 1500 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await scheduleEventPage!.driverPage.screenshot({ 
      path: "./test-artifacts/betfair-schedule-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 1500 } 
    }); 
    
    await driverBrowser.close();
  })
  
  test("BetfairSchedulePage reads current horse racing venue names.", async () => {    
    const venueNames = await scheduleEventPage!.getVenueNames();
    bfSchedulePageLogger.log(venueNames);
  });

  test("BetfairSchedulePage reads current horse racing venue names and their events' time.", async () => {    
    const venueNamesToEvents = await scheduleEventPage!.getVenueNamesToEvents()
    bfSchedulePageLogger.log(venueNamesToEvents);
  });
});