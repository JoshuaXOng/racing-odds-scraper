'use strict';

const puppeteer = require('puppeteer');
const urls = require('../urls.json');



class HorseRacingScheduleReader {

    _puppeteerPage;

    /**
     * Constructor.
     * 
     * @param {puppeteer.Page} page 
     */
    constructor(puppeteerPage) {
        this.setPuppeteerPage(puppeteerPage);
    }

    /**
     * Setter of `this` _puppeteerPage attribute.
     * 
     * @param {puppeteer.Page} page Tab opened at the Betfair url for the horse racing schedule.
     */
    setPuppeteerPage(puppeteerPage) {
        if (puppeteerPage.url() !== urls.betfair.horseRacingBettingPage) 
            throw new Error('Provided Puppeteer Page is not on the Betfair Schedule Page.');
        else this._puppeteerPage = puppeteerPage;
    }

    fetchVenuesNames() {
        this._puppeteerPage.$$('.meeting-label')
            .then(names => console.log(names));
    }

    fetchEvents() {

    }

}



module.exports = { HorseRacingScheduleReader };