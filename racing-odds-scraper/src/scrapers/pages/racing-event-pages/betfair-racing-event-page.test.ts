import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrlsMap } from "../../../constants";
import { Browser } from "../../browsers/browser";
import { BetfairRacingEventPage } from "./betfair-racing-event-page";
import { BetfairSchedulePage } from "../schedule-pages/betfair-schedule-page";

const bfRacingEventPageLogger = new Console({
  stdout: fs.createWriteStream("./test-artifacts/betfair-racing-event-page-ut.txt")
});

let arbitraryBfRacingEventPageUrl = "https://www.betfair.com.au/exchange/plus/";

describe("BetfairRacingEventPage Unit Tests.", () => {
  jest.setTimeout(20000);

  let puppeteerBrowser: PBrowser;
  let browser: Browser;

  beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(puppeteerBrowser);

    const bfHRacingScheduleUrl = new URL(bookiesToUrlsMap.betfair.racing);
    const bfSchedulePage = new BetfairSchedulePage(bfHRacingScheduleUrl);
    const isBfspAddPageSuccessful = await browser.addPage(bfSchedulePage);
    expect(isBfspAddPageSuccessful).toBe(true);
    
    const venueNamesToEventsMap = await bfSchedulePage.venueNamesToEventsMap() as {};
    const venueName = Object.keys(venueNamesToEventsMap)[0] as string;
    arbitraryBfRacingEventPageUrl += venueNamesToEventsMap[venueName][0].link;
    
    const bfRacingEventPageUrl = new URL(arbitraryBfRacingEventPageUrl);
    const bfRacingEventPage = new BetfairRacingEventPage(bfRacingEventPageUrl);
    const isBfrepAddPageSuccessful = await browser.addPage(bfRacingEventPage);
    expect(isBfrepAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairRacingEventPage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairRacingEventPage[];
    
    await bfSchedulePage!.page.setViewport({ width: 1920, height: 2500 });
    await new Promise(resolve => setTimeout(resolve, 2000)); // Needed to counter un-awaitable capture-length/delay causing blur.
    await bfSchedulePage!.page.screenshot({ 
      path: "./test-artifacts/betfair-racing-event-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 2500 } 
    }); 
    
    await puppeteerBrowser.close();
  })

  test("BetfairRacingEventPage reads current contestants' names.", async () => {
    const bfRacingEventPages = browser.pages.filter(p => p instanceof BetfairRacingEventPage);
    expect(bfRacingEventPages.length).toBe(1);
    const [bfRacingEventPage] = bfRacingEventPages as BetfairRacingEventPage[];
    
    const contestantNames = await bfRacingEventPage!.contestantNames();
    bfRacingEventPageLogger.log(contestantNames);
  });

  test("BetfairRacingEventPage reads current horses' names.", async () => {
    const bfRacingEventPages = browser.pages.filter(p => p instanceof BetfairRacingEventPage);
    expect(bfRacingEventPages.length).toBe(1);
    const [bfRacingEventPage] = bfRacingEventPages as BetfairRacingEventPage[];
    
    const contestantNamesToHorseNamesMap = await bfRacingEventPage!.contestantNamesToHorseNamesMap();
    bfRacingEventPageLogger.log(contestantNamesToHorseNamesMap);
  });
});