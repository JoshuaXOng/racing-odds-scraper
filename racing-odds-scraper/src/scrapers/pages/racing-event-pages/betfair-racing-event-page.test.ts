import { Console } from "console";
import fs from "fs";
import puppeteer, { Browser as PBrowser } from "puppeteer";
import { bookiesToUrls } from "../../../constants";
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
  let racingEventPage: BetfairRacingEventPage;

  beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(puppeteerBrowser);

    const racingScheduleUrl = new URL(bookiesToUrls.betfair.racing);
    const schedulePage = new BetfairSchedulePage(racingScheduleUrl);
    const isSpAddPageSuccessful = await browser.addPage(schedulePage);
    expect(isSpAddPageSuccessful).toBe(true);
    
    const venueNamesToEventsMap = await schedulePage.venueNamesToEventsMap() as {};
    const venueName = Object.keys(venueNamesToEventsMap)[0] as string;
    arbitraryBfRacingEventPageUrl += venueNamesToEventsMap[venueName][0].link;
    
    const racingEventPageUrl = new URL(arbitraryBfRacingEventPageUrl);
    racingEventPage = new BetfairRacingEventPage(racingEventPageUrl);
    const isRepAddPageSuccessful = await browser.addPage(racingEventPage);
    expect(isRepAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    await racingEventPage!.page.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await racingEventPage!.page.screenshot({ 
      path: "./test-artifacts/betfair-racing-event-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 1080 } 
    }); 
    
    await puppeteerBrowser.close();
  })

  test("BetfairRacingEventPage reads current contestants' names.", async () => {
    const contestantNames = await racingEventPage!.contestantNames();
    bfRacingEventPageLogger.log(contestantNames);
  });

  test("BetfairRacingEventPage reads current horses' names.", async () => {
    const contestantNamesToHorseNamesMap = await racingEventPage!.contestantNamesToHorseNamesMap();
    bfRacingEventPageLogger.log(contestantNamesToHorseNamesMap);
  });
  
  test("BetfairRacingEventPage reads odds table.", async () => {
    const contestantNamesToOddsMap = await racingEventPage!.contestantNamesToOddsMap();
    bfRacingEventPageLogger.log(contestantNamesToOddsMap);
  });

  test("BetfairRacingEventPage reads in-play status.", async () => {
    const isEventInPlay = await racingEventPage!.isEventInPlay();
    bfRacingEventPageLogger.log(`isEventInPlay: ${isEventInPlay}`);
  });

  test("BetfairRacingEventPage reads suspended alert.", async () => {
    const isEventSuspended = await racingEventPage!.isEventSuspended();
    bfRacingEventPageLogger.log(`isEventSuspended: ${isEventSuspended}`);
  });

  test("BetfairRacingEventPage reads ended status.", async () => {
    const hasEventEnded = await racingEventPage!.hasEventEnded();
    bfRacingEventPageLogger.log(`hasEventEnded: ${hasEventEnded}`);
  });
});