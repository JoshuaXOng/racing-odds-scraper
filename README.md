# Racing Odds Scraper

A containerized application for scraping and aggregating racing data (in close to real time XD).
- Racing === horses (but structure is pretty extensible)
- Automated, as in, indefinitely determines on it's own what it should scrape  
- Cross sourced - perhaps most interesting against bookies vs markets (e.g., Betfair)

### Miscellaneous notes:

- YYYYMMDDHHSS
- Remove terraform code (remove deployment logic from ops and bus. logic)

### Issues:

- Find out if `screenshot(...)` has an un-awaitable capture-length/delay - no, DOM does not load in fast enough
- Add self closing functionality to pages (w/ a potential delay) - confirm with last of schedule page and event page
- Bf seemingly does not update in race

### Likely Fixes:

- Set a timeout for puppeteer `waitForSelector(...)` - handle
- Puppeteer runs browser queries in isolation - "XXS" to fetch localy hosted scripts

### Look Into:

- Log to a file plis
- Profile performance...
- D3
- Some analysis tool
- Desktop Appication for visualization (Electron, Taurin)
