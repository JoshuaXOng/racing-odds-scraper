import { OddsRecord } from "./odds/odds-record";
import { Venue } from "./venue";

export class Event {
  venue: Venue;
  scheduledStartTime: string;
  oddsRecords: OddsRecord[];
}

const _ = {
  venue: {
    name: "string",
    country: "string",
  },
  scheduledStartTime: "string",
  oddsRecords: [
    {
      hostnameSource: "string",
      oddsTables: [
        {
          datetimeCaptured: null,
          oddsRows: [
            {
              forContestant: { name: "string", horseName: "string" },
              entryOdds: [
                {
                  decimalValue: "string",
                  availableMoney: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
