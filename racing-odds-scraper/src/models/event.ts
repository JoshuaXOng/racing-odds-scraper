import { OddsRecord } from "./odds/odds-record";

export class Event {
  scheduledStartTime: string;
  oddsRecord: OddsRecord;

  constructor(scheduledStartTime: string, hostnameSoure: string) {
    this.scheduledStartTime = scheduledStartTime;
    this.oddsRecord = new OddsRecord(hostnameSoure);
  }
}

// class AssociationEnity {
//   venue: Venue;
//   event: Event
// }

// {
//   venue: {
//     name: "string",
//     country: "string",
//   },
//   scheduledStartTime: "string",
//   oddsRecords: {
//     hostnameSource: "string",
//     oddsTables: [
//       {
//         datetimeCaptured: null,
//         oddsRows: [
//           {
//             forContestant: { name: "string", horseName: "string" },
//             entryOdds: [
//               {
//                 decimalValue: "string",
//                 availableMoney: "string",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };

// const _ = {
//   venue: {
//     name: "string",
//     country: "string",
//     events: [{
//       scheduledStartTime: "string",
//       oddsRecords: {
//         hostnameSource: "string",
//         oddsTables: [
//           {
//             datetimeCaptured: null,
//             oddsRows: [
//               {
//                 forContestant: { name: "string", horseName: "string" },
//                 entryOdds: [
//                   {
//                     decimalValue: "string",
//                     availableMoney: "string",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     }]
//   },
// };
