import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrlsMap } from "../../constants";
import { Browser } from "./browser";
import { BetfairSchedulePage } from "../pages/schedule-pages/betfair-schedule-page";

describe("Browser Unit Tests.", () => {
  jest.setTimeout(10000);

  let puppeteerBrowser: PBrowser;
  let browser: Browser;

  beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await puppeteerBrowser.close();
  })
  
  test("Initialize Browser and open Betfair's Horse Racing Schedule Page.", async () => {
    browser = new Browser(puppeteerBrowser);

    const racingScheduleUrl = new URL(bookiesToUrlsMap.betfair.racing);
    const schedulePage = new BetfairSchedulePage(racingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(schedulePage);
    expect(isAddPageSuccessful).toBe(true);
  });

  test("Browser returns currect number of tabs open.", async () => {
    const numOpenedPages = await browser.numOpenedPages();
    expect(numOpenedPages).toBe(2);
  })

  test("Browser returns currect number of tabs open per url.", async () => {
    const bfHRacingScheduleUrl = new URL(bookiesToUrlsMap.betfair.racing);
    const bfSchedulePage = new BetfairSchedulePage(bfHRacingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(bfSchedulePage);
    expect(isAddPageSuccessful).toBe(true);
    
    const urlsToNumOpenedTabs = await browser.numOpenedPagesPerUrl();
    expect(Object.keys(urlsToNumOpenedTabs).length).toBe(2);
    expect(urlsToNumOpenedTabs[bookiesToUrlsMap.betfair.racing]).toBe(2);
  })

  test("Browser closes all pages of a certain url.", async () => {
    let numOpenedPages = await browser.numOpenedPages();
    expect(numOpenedPages).toBe(3);
    await browser.closePages(new URL(bookiesToUrlsMap.betfair.racing));
    numOpenedPages = await browser.numOpenedPages();
    expect(numOpenedPages).toBe(1);
  })
});