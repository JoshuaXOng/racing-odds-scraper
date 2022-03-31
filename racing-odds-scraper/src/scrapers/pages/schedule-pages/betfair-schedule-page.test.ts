import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrlsMap } from "../../../constants";
import { Browser } from "../../browsers/browser";
import { BetfairSchedulePage } from "./betfair-schedule-page";

describe("BetfairSchedulePage Unit Tests.", () => {
  jest.setTimeout(15000);

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
    await puppeteerBrowser.close();
  })
  
  test("BetfairSchedulePage reads current horse racing venue names.", async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairSchedulePage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairSchedulePage[];
    
    const venuesName = await bfSchedulePage!.venuesName();
    console.log(venuesName);
  });

  test("BetfairSchedulePage reads current horse racing venue names and their events' time.", async () => {
    const bfSchedulePages = browser.pages.filter(p => p instanceof BetfairSchedulePage);
    expect(bfSchedulePages.length).toBe(1);
    const [bfSchedulePage] = bfSchedulePages as BetfairSchedulePage[];
    
    // const eventsTime = await bfSchedulePage!.venuesToEventsMap();
    console.log(await bfSchedulePage!.venuesToEventsMap());
    // console.log(eventsTime);
  });
});