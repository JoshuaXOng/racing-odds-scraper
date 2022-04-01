import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { Browser } from "../../browsers/browser";
import { BetfairRacingEventPage } from "./betfair-racing-event-page";

const bfRacingEventPageLogger = new Console({
  stdout: fs.createWriteStream("./test-artifacts/betfair-racing-event-page-ut.txt")
});

const arbitraryBfRacingEventPageUrl = "https://www.betfair.com.au/exchange/plus/horse-racing/market/1.196917980";

describe("BetfairRacingEventPage Unit Tests.", () => {
  jest.setTimeout(20000);

  let puppeteerBrowser: PBrowser;
  let browser: Browser;

  beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(puppeteerBrowser);
    
    const bfRacingEventPageUrl = new URL(arbitraryBfRacingEventPageUrl);
    const bfRacingEventPage = new BetfairRacingEventPage(bfRacingEventPageUrl);
    const isAddPageSuccessful = await browser.addPage(bfRacingEventPage);
    expect(isAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairRacingEventPage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairRacingEventPage[];
    
    await bfSchedulePage!.page.setViewport({ width: 1920, height: 2500 });
    await bfSchedulePage!.page.screenshot({ 
      path: "./test-artifacts/betfair-racing-event-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 2500 } 
    }); // There is some capture-length/delay causing blur.
    
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