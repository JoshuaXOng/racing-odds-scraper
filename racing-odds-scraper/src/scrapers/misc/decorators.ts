// const puppeteer = require('puppeteer');
// const messages = require('../../configs/messages.json');
// const requestsconfig = require('../../configs/requests.json');

// async function nonHeadlessRequest() {
// 	return await async function decorator(target, name, descriptor) {
// 		if (!(descriptor instanceof puppeteer.Page)) 
// 				throw new Error(messages.errors.nonHeadlessRequestDecorator.incorrectApplication);

// 		await descriptor.setUserAgent(requestsconfig.headers.nonHeadlessUA);
// 		return descriptor;
// 	}
// }

export const hasNonUndefValues = (testedValues: string[]) => {
	return function (classTarget: Object, methodName: string | symbol, methodDescriptor: PropertyDescriptor) {
		console.log(classTarget)
		console.log(methodName)
		console.log(methodDescriptor);
		
		const isAnyFalse = testedValues.reduce((isAnyFalse, tv) => !isAnyFalse && (classTarget[tv] === undefined), false)
		if (isAnyFalse) 
			throw new Error("One of the provided values is undefined.");
		return methodDescriptor;
	}
}