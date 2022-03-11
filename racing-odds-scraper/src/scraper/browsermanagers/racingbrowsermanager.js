/**
 * Contains the `RacingBrowserManager` class.
 */

'use strict';

const { BrowserManager } = require("./browsermanager");



class RacingBrowserManager extends BrowserManager {

    _browser;

    /**
     * A `puppeteer.Page` that 
     */
    shedulePage;

    /**
     * 
     */
    eventPages = [];

    /**
     * Constructor.
     * 
     * @param {puppeteer.Browser} browser 
     */
    constructor(browser) {
        this._browser = browser;
    }


}



module.exports = { RacingBrowserManager };