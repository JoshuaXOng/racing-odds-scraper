import { EventsObserver } from "../scrapers/event-page-manager";
import { EventPage } from "src/scrapers/pages/event-page";

type Venue = {
  name: string;
  countryName: string;
}

type Odd = {
  value: string;
  money: string;
}

type OddsRow = {
  forContestant: {
    name: string,
  },
  oddCells: Odd[]
}

type OddsTable = {
  datetimeCaptured: Date,
  oddsRows: OddsRow[]
}

export class DBOutput implements EventsObserver {
  events: ({
    venue: Venue,
    scheduledStartTime: string,
    oddsRecords: {
      hostnameSource: string,
      oddsTables: OddsTable[]
    }[]
  })[] = [];

  //
  // EventsObserver Implementation.
  //

  async onEventPagesPolling(eventPages: EventPage[]) {
    for (let eventPage of eventPages) {
      const { name: atVenueName, countryName: inCountryName } = await eventPage.getVenue();
      const scheduledStartTime = await eventPage.getEventStartTime();

      const currentEvent = this.events.find(
        e => e.venue.name === atVenueName && 
        e.venue.countryName === inCountryName &&
        e.scheduledStartTime === scheduledStartTime
      )

      if (!currentEvent) {
        let oddsRows: any = [];

        const contestantNamesToOdds = await eventPage.getContestantNamesToOdds();
        for (let contestantName in contestantNamesToOdds) {
          oddsRows.push({
            forContestant: { name: contestantName },
            entryOdds: contestantNamesToOdds[contestantName],
          });
        };

        this.events.push({
          venue: {
            name: atVenueName,
            countryName: inCountryName
          },
          scheduledStartTime,
          oddsRecords: [{
            hostnameSource: eventPage.sourceUrl.hostname,
            oddsTables: [{
              datetimeCaptured: new Date(),
              oddsRows
            }]
          }],
        });

        return;
      }

      let oddsRows: any = [];

      const contestantNamesToOdds = await eventPage.getContestantNamesToOdds();
      for (let contestantName in contestantNamesToOdds) {
        oddsRows.push({
          forContestant: { name: contestantName },
          entryOdds: contestantNamesToOdds[contestantName],
        });
      };

      const eventPageHostname = eventPage.sourceUrl.hostname;
      const oddsRecord = currentEvent.oddsRecords.find(ceor => ceor.hostnameSource === eventPageHostname);
      
      if (!oddsRecord) {
        currentEvent.oddsRecords.push({
          hostnameSource: eventPageHostname,
          oddsTables: [{
            datetimeCaptured: new Date(),
            oddsRows
          }]
        })

        return;
      }

      oddsRecord.oddsTables.push({
        datetimeCaptured: new Date(),
        oddsRows
      });
    }
  }

  onEventPageClosure(eventPage: EventPage) {
    console.log(eventPage)
    // Save to DB 
    // Tidy up this.events
  }

  toObject() {
    return this.events;
  }
}
