import fastify from "fastify";
import { bookiesToUrls } from "./constants";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

let scheduler: Scheduler;

const server = fastify({ logger: true });

server.get('/api/scheduler/schedules/', async (_, reply) => {
	return reply.send(scheduler.soupedSchedules);
});

(async () => {
	scheduler = new Scheduler();
	await scheduler.initBrowser();
	await scheduler.addSourcePage(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
	
	await server.listen(3000);
})();