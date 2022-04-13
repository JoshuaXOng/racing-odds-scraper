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

let arbitraryBfRacingEventPageUrl = "";

describe("BetfairRacingEventPage Unit Tests.", () => {
  jest.setTimeout(20000);

  let driverBrowser: PBrowser;
  let browser: Browser;
  let racingEventPage: BetfairRacingEventPage;

  beforeAll(async () => {
    driverBrowser = await puppeteer.launch({ headless: true });
    browser = new Browser(driverBrowser);

    const racingScheduleUrl = new URL(bookiesToUrls.betfair.racing);
    const schedulePage = new BetfairSchedulePage(racingScheduleUrl);
    const isSpAddPageSuccessful = await browser.addPage(schedulePage);
    expect(isSpAddPageSuccessful).toBe(true);
    
    const venueNamesToEventsMap = await schedulePage.getVenueNamesToEvents() as {};
    const venueName = Object.keys(venueNamesToEventsMap)[0] as string;
    arbitraryBfRacingEventPageUrl += venueNamesToEventsMap[venueName][0].link;
    
    const racingEventPageUrl = new URL(arbitraryBfRacingEventPageUrl);
    racingEventPage = new BetfairRacingEventPage(racingEventPageUrl);
    const isRepAddPageSuccessful = await browser.addPage(racingEventPage);
    expect(isRepAddPageSuccessful).toBe(true);
  });
  
  afterAll(async () => {
    await racingEventPage!.driverPage.setViewport({ width: 1920, height: 1080 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await racingEventPage!.driverPage.screenshot({ 
      path: "./test-artifacts/betfair-racing-event-page-ut.jpeg", 
      clip: { x: 0, y: 0, width: 1920, height: 1080 } 
    }); 
    
    await driverBrowser.close();
  })

  test("BetfairRacingEventPage reads event name.", async () => {
    const eventName = await racingEventPage!.getEventName();
    bfRacingEventPageLogger.log(eventName);
  });

  test("BetfairRacingEventPage reads current contestants' names.", async () => {
    const contestantNames = await racingEventPage!.getContestantNames();
    bfRacingEventPageLogger.log(contestantNames);
  });

  test("BetfairRacingEventPage reads current horses' names.", async () => {
    const contestantNamesToHorseNames = await racingEventPage!.getContestantNamesToHorseNames();
    bfRacingEventPageLogger.log(contestantNamesToHorseNames);
  });
  
  test("BetfairRacingEventPage reads odds table.", async () => {
    const contestantNamesToOdds = await racingEventPage!.getContestantNamesToOdds();
    bfRacingEventPageLogger.log(contestantNamesToOdds);
  });

  test("BetfairRacingEventPage reads in-play status.", async () => {
    const isEventInPlay = await racingEventPage!.getIsEventInPlay();
    bfRacingEventPageLogger.log(`isEventInPlay: ${isEventInPlay}`);
  });

  test("BetfairRacingEventPage reads suspended alert.", async () => {
    const isEventSuspended = await racingEventPage!.getIsEventSuspended();
    bfRacingEventPageLogger.log(`isEventSuspended: ${isEventSuspended}`);
  });

  test("BetfairRacingEventPage reads ended status.", async () => {
    const hasEventEnded = await racingEventPage!.getHasEventEnded();
    bfRacingEventPageLogger.log(`hasEventEnded: ${hasEventEnded}`);
  });
});