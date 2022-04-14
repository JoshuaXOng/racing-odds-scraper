import fastify from "fastify";
import "dotenv/config";
import { bookiesToUrls } from "./constants";
import { DBOutput } from "./integration/db-output";
// import { JsonOutput } from "./integration/json-output";
import { EventPageManager, EventsObserver } from "./scrapers/event-page-manager";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

let scheduler: Scheduler;
let eventPageManager: EventPageManager;
let eventPagesProcessor: EventsObserver;

const server = fastify({ logger: true });

server.get("/api/schedules/", async (_, reply) => {
  return reply.send(scheduler.soupedSchedules);
});

server.get("/api/up-coming-events/links/", async (_, reply) => {
  return reply.send(scheduler.getUpcomingEventLinks(0, scheduler.upcomingThresholdInMin));
});

server.get("/api/souped-events/", async (_, reply) => {
  return reply.send(eventPagesProcessor.toObject());
});

(async () => {
  scheduler = new Scheduler();
  await scheduler.initBrowser();
  await scheduler.addSourcePage(new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing)));
  await scheduler.startSoupingSources();

  eventPageManager = new EventPageManager();
  await eventPageManager.initBrowser();
  await eventPageManager.startSouping();

  eventPagesProcessor = new DBOutput();
  // eventPagesProcessor = new JsonOutput();
  eventPageManager.addEventsObserver(eventPagesProcessor);

  scheduler.addScheduleObserver(eventPageManager);

  await server.listen(3000);
})();
