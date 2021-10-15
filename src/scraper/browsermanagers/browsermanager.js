/**
 * Contains the base class `BrowserManager`.
 */
'use strict';

const puppeteer = require('puppeteer');
const assert = require('assert');



/**
 * Corresponds to a single browser window.
 */
class BrowserManager {

    _browser;

    /**
     * Constructor.
     * 
     * @param {puppeteer.Browser} browser 
     */
    constructor(browser) {
        this._browser = browser;
    }

    /**
     * Returns the number of tabs opened in the browser.
     * 
     * @returns {number}
     */
    async noOpenedTabs() {
        const pages = await this._browser.pages();
        return pages.length;
    }
    
    /**
     * Returns the opened tabs' urls.
     * 
     * @returns {Array<string>}
     */
    async _openedTabsUrls() {
        const pages = await this._browser.pages();
        const urls = pages.map(page => page.url());
        return urls;
    }

    /**
     * Returns the number of tabs open categorized based on host name.
     * 
     * @returns {Object}    Keys are the host name, values are the count.
     */
    async noOpenedTabsPerHost() {
        const urls = await this._openedTabsUrls();
        const hosts = urls.map(url => new URL(url));
        const tally = {};
        hosts.forEach(host => tally[host] = tally[host] ? tally[host] + 1 : 1);
        return tally;
    }

    /**
     * Returns the number of tabs open categorized based on exact url.
     * 
     * @returns {Object}    Keys are the url category, values are the count.
     */
    async noOpenedTabsPerUrl() {
        const urls = await this._openedTabsUrls();
        const tally = {};
        urls.forEach(url => tally[url] = tally[url] ? tally[url] + 1 : 1);
        return tally;
    }
    
    /**
     * Opens a new `puppeteer.Page` and makes it go to the input `url`.
     * 
     * @param {string} url
     */
    async openTab(url) {
        const page = await this._browser.newPage();
        await page.goto(url);
        return page;
    }

    /**
     * Closes `puppeteer.Page`s of `this._browser` that matches `url` input.
     * 
     * @param {string} url
     */
    async closeTabs(url) {
        
        const pages = await this._browser.pages();
        const targetPages = pages.filter(page => page.url() === url);
        await targetPages.forEach(targetPage => targetPage.close());
        
        const isAllTPagesClosed = targetPages.every(page => page.isClosed());
        assert(isAllTPagesClosed, 'Target pages have not been closed, incorrect async/await logic.');

    }

}



module.exports = { BrowserManager };