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

server.get('/api/schedules/up-coming/', async (_, reply) => {
	return reply.send(scheduler.getUpcomingEventLinks());
});

server.get('/api/events/', async (_, reply) => {
	return reply.send(eventPageManager.soupedEvents);
});

/** Open up event pages for events 1 minute out (e.g.). */
server.get('/api/events/post/', async (_, reply) => {
	const endIndex = scheduler.getUpcomingEventLinks().length - 1;
	const link = scheduler.getUpcomingEventLinks()[endIndex];
	
	if (!link) return reply.status(500).send("500 Error.");

	await eventPageManager.addEventPage(new BetfairRacingEventPage(new URL(link)));
	return reply.send();
});

/** Close all finished event pages. */
server.get('/api/events/delete/', async (_, reply) => {
	return reply.send(eventPageManager.soupedEvents);
});

(async () => {
	scheduler = new Scheduler();
	await scheduler.initBrowser();
	await scheduler.addSourcePage(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
	await scheduler.startSoupingSources();

	eventPageManager = new EventPageManager();
	await eventPageManager.initBrowser();
	await eventPageManager.startSoupingEvents();

	await server.listen(3000);
})();