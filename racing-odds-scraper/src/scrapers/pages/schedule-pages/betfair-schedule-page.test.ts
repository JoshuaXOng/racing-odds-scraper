import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrlsMap } from "../../../constants";
import { Browser } from "../../browsers/browser";
import { BetfairSchedulePage } from "./betfair-schedule-page";

const bfSchedulePageLogger = new Console({
  stdout: fs.createWriteStream("./test-artifacts/betfair-schedule-page-ut.txt")
});

describe("BetfairSchedulePage Unit Tests.", () => {
  jest.setTimeout(20000);

  let puppeteerBrowser: PBrowser;
  let browser: Browser;

  beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(puppeteerBrowser);
    
    const bfHRacingScheduleUrl = new URL(bookiesToUrlsMap.betfair.racing);
    const bfSchedulePage = new BetfairSchedulePage(bfHRacingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(bfSchedulePage);
    expect(isAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairSchedulePage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairSchedulePage[];
    
    await bfSchedulePage!.page.setViewport({ width: 1920, height: 2500 });
    await bfSchedulePage!.page.screenshot({ 
      path: "./test-artifacts/betfair-schedule-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 2500 } 
    }); // There is some capture-length/delay causing blur.
    
    await puppeteerBrowser.close();
  })
  
  test("BetfairSchedulePage reads current horse racing venue names.", async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairSchedulePage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairSchedulePage[];
    
    const venuesName = await bfSchedulePage!.venueNames();
    bfSchedulePageLogger.log(venuesName);
  });

  test("BetfairSchedulePage reads current horse racing venue names and their events' time.", async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairSchedulePage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairSchedulePage[];
    
    const venuesToEventsMap = await bfSchedulePage!.venueNamesToEventsMap()
    bfSchedulePageLogger.log(venuesToEventsMap);
  });
});