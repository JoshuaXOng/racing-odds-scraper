/**
 * Contains the class `HorseRacingBrowserManager`.
 */
'use strict';

const { BrowserManager } = require('./browsermanager');



class HorseRacingBrowserManager extends BrowserManager {

    _browser;

    /**
     * Constructor.
     * 
     * @param {puppeteer.Browser} browser 
     */
    constructor(browser) {
        this._browser = browser;
    }

    open

}