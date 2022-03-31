import { Browser as PBrowser } from "puppeteer";
import { bookiesToUrlsMap } from "../../constants";
import { Browser } from "./browser";

describe("Browser Unit Tests.", () => {
  let pBrowser; //: PBrowser;

  beforeAll(async () => {
    pBrowser = await puppeteer.launch({ headless: false });
  });

  afterAll(async () => {
    pBrowser.close();
  })
  
  test('Initialize Browser and open a Page.', () => {
    console.log("++++++++++++++++++++")
    // const browser = new Browser(pBrowser);
    // browser.addPage(new URL("https://www.youtube.com/"));
  });
});

// (async () => {
    
//     const browser = await puppeteer.launch({ 
//         headless: false,
//     });
//     let pages = await browser.pages()

//     const page = pages[0]
    
//     await page.setUserAgent(requestsconfig.nonHeadlessUA);
    
//     let currentURL = urls.betfair.horseRacingBettingPage;
//     await page.goto(currentURL);

    
//     await page.waitForSelector('.meeting-label');
//     const text = await page.$eval('.meeting-label', element => element.innerText);;
    
//     console.log(text);
//     console.log('test');

// })();

