import { bookiesToUrls } from "./constants";
import { BetfairSchedulePage } from "./scrapers/pages/schedule-pages/betfair-schedule-page";
import { Scheduler } from "./scrapers/scheduler";

(async () => {
	const betfairSchedulePage = new BetfairSchedulePage(new URL(bookiesToUrls.betfair.racing));
	const scheduler = new Scheduler();
	await scheduler.setupAndRun(betfairSchedulePage);
	// while (1) {
	// 	scheduler.pollUpcomingEvents();
	// }
})();
