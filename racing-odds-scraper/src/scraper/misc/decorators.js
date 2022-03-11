/**
 * Contains declarations for all used decorators.
 */

'use strict';

const puppeteer = require('puppeteer');
const messages = require('../../configs/messages.json');
const requestsconfig = require('../../configs/requests.json');



/**
 * A decorator generator that sets a `puppeteer.Page`'s requests' header's UA value to non-headless.
 * 
 * @returns     A class member decorator.
 */
async function nonHeadlessRequest() {
    return await async function decorator(target, name, descriptor) {
    
        if (!(descriptor instanceof puppeteer.Page)) 
            throw new Error(messages.errors.nonHeadlessRequestDecorator.incorrectApplication);

        await descriptor.setUserAgent(requestsconfig.headers.nonHeadlessUA);
        return descriptor;

    }
}



module.exports = { nonHeadlessRequest };