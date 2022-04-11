import fastify from "fastify";
import { bookiesToUrls } from "./constants";
import { EventPageManager } from "./scrapers/event-page-manager";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

let scheduler: Scheduler;
let eventPageManager: EventPageManager;

const server = fastify({ logger: true });

server.get('/api/schedules/', async (_, reply) => {
	return reply.send(scheduler.soupedSchedules);
});

(async () => {
	scheduler = new Scheduler();
	await scheduler.initBrowser();
	await scheduler.addSourcePage(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
	
	eventPageManager = new EventPageManager();
	await eventPageManager.initBrowser();

	await server.listen(3000);
})();