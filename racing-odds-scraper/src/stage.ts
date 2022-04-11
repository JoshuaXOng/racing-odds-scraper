import fastify from "fastify";
import { bookiesToUrls } from "./constants";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

let schedulers: Scheduler[] = [];

(async () => {
	const scheduler = new Scheduler();
	schedulers.push(scheduler);
	await scheduler.setupAndRun(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
})();

const server = fastify({ logger: true });

server.get('/api/schedulers/schedules/', async (_, reply) => {
  return reply.send(schedulers.map(s => s.schedule));
});

server.listen(3000);