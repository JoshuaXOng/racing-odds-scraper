import fastify from "fastify";
import { bookiesToUrls } from "./constants";
import { EventPageManager } from "./scrapers/event-page-manager";
import { BetfairRacingEventPage } from "./scrapers/pages/racing-event-pages/betfair-racing-event-page";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

let scheduler: Scheduler;
let eventPageManager: EventPageManager;

const server = fastify({ logger: true });

server.get('/api/schedules/', async (_, reply) => {
	return reply.send(scheduler.soupedSchedules);
});

server.get('/api/events/', async (_, reply) => {
	return reply.send(eventPageManager.soupedEvents);
});

(async () => {
	scheduler = new Scheduler();
	await scheduler.initBrowser();
	await scheduler.addSourcePage(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
	await scheduler.startSoupingSources();

	eventPageManager = new EventPageManager();
	await eventPageManager.initBrowser();
	await eventPageManager.addEventPage(new BetfairRacingEventPage(new URL("https://www.betfair.com.au/exchange/plus/horse-racing/market/1.197485361")));
	await eventPageManager.startSoupingEvents();

	await server.listen(3000);
})();