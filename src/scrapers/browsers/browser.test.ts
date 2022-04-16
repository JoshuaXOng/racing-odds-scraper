import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrls } from "../../constants";
import { Browser } from "./browser";
import { BetfairSchedulePage } from "../pages/schedule-pages/betfair-schedule-page";

describe("Browser Unit Tests.", () => {
  jest.setTimeout(10000);

  let driverBrowser: PBrowser;
  let browser: Browser;

  beforeAll(async () => {
    driverBrowser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await driverBrowser.close();
  });

  test("Initialize Browser and open Betfair's Horse Racing Schedule Page.", async () => {
    browser = new Browser(driverBrowser);

    const racingScheduleUrl = new URL(bookiesToUrls.betfair.racing);
    const schedulePage = new BetfairSchedulePage(racingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(schedulePage);
    expect(isAddPageSuccessful).toBe(true);
  });

  test("Browser returns currect number of tabs open.", async () => {
    const numOpenedPages = await browser.getNumOpenedPages();
    expect(numOpenedPages).toBe(2);
  });

  test("Browser returns currect number of tabs open per url.", async () => {
    const bfHRacingScheduleUrl = new URL(bookiesToUrls.betfair.racing);
    const bfSchedulePage = new BetfairSchedulePage(bfHRacingScheduleUrl);
    const isAddPageSuccessful = await browser.addPage(bfSchedulePage);
    expect(isAddPageSuccessful).toBe(true);

    const urlsToNumOpenedTabs = await browser.getNumOpenedPagesPerUrl();
    expect(Object.keys(urlsToNumOpenedTabs).length).toBe(2);
    expect(urlsToNumOpenedTabs[bookiesToUrls.betfair.racing]).toBe(2);
  });

  test("Browser closes all pages of a certain url.", async () => {
    let numOpenedPages = await browser.getNumOpenedPages();
    expect(numOpenedPages).toBe(3);
    await browser.closePages(new URL(bookiesToUrls.betfair.racing));
    numOpenedPages = await browser.getNumOpenedPages();
    expect(numOpenedPages).toBe(1);
  });
});
