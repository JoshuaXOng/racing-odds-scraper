'use strict';

const puppeteer = require('puppeteer');
const urls = require('./configs/urls.json');
const requestsconfig = require('./configs/requests.json');
const { BrowserManager } = require('./scraper/browsermanagers/browsermanager');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
    });
    
    const bm = new BrowserManager(browser);
    
    await bm.openTab(urls.betfair.base);

    const res = await bm.noOpenedTabsPerUrl();
    console.log(res);
})();

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
