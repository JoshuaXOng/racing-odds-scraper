# Racing Odds Scraper

A containerized application for scraping and aggregating racing data (in close to real time XD).
- Racing === horses (but structure is pretty extensible)
- Automated, as in, indefinitely determines on it's own what it should scrape  
- Cross sourced - perhaps most interesting against bookies vs markets (e.g., Betfair)

### Misc. notes:

- Profile performance...
- Set a timeout for puppeteer `waitForSelector(...)` - handle
- Find out if `screenshot(...)` has an un-awaitable capture-length/delay - no, DOM does not load in fast enough
- Filter out green icon in bf schedule links (appears before event start)
- Add self closing functionality to pages (w/ a potential delay)
- Pages should self poll
- YYYYMMDDHHSS
- Bf seemingly does not update in race
- NEED TO CLOSE ON DELAY because bookies websites don't update all at once - or dependent on schedule page...
