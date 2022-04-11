const puppeteer = require('puppeteer');
const messages = require('../../configs/messages.json');
const requestsconfig = require('../../configs/requests.json');

async function nonHeadlessRequest() {
	return await async function decorator(target, name, descriptor) {
		if (!(descriptor instanceof puppeteer.Page)) 
				throw new Error(messages.errors.nonHeadlessRequestDecorator.incorrectApplication);

		await descriptor.setUserAgent(requestsconfig.headers.nonHeadlessUA);
		return descriptor;
	}
}