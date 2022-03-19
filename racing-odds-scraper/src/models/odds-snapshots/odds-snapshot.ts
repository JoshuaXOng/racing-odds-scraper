import { Contestant } from "../contestants/contestant";

export class Currency {
  // Wrap Dinero
}

export class Odd {
  private value: number;
  // private moneyMatched: number;
  // private moneyUnmatched: number;
  
  constructor(value: number) {
    this.value = value;
  }

  toDecimal() {
    return this.value;
  }
  toFraction() {
  }
} 

export type ContestantOddsSnapshot = { 
  dateTimeCaptured: Date;
  contestant: Contestant; 
  odds: Odd[];
};

export class OddsSnapshot {
  private contestantsSnapshot: ContestantOddsSnapshot[];

  private wasContestantSnapshotAlreadyEntered(contestantSnapshot: ContestantOddsSnapshot) {
    const contestantId = contestantSnapshot.contestant.id;
    const potentialDuplicateSnapshot = this.contestantsSnapshot.map(co => co.contestant).find(c => c.id === contestantId);
    if (potentialDuplicateSnapshot && contestantId)
      return true;
    else 
      return false;
  }

  addContestantOddsSnapshot(contestantSnapshot: ContestantOddsSnapshot) {
    const wasContestantSnapshotAlreadyEntered = this.wasContestantSnapshotAlreadyEntered(contestantSnapshot);
    if (wasContestantSnapshotAlreadyEntered) {
      throw new Error("Cannot add new contestant snapshot as one already exists with the same Contestant ID.");
    } 

    this.contestantsSnapshot.push(contestantSnapshot);
  }

  addContestantsOddSnapshot(contestantsSnapshot: ContestantOddsSnapshot[]) {

  }

  getAverageDateTimeCaptured() {
    if (!this.contestantsSnapshot.length) {
      return undefined;
    }

    const cSnapshotsDateTime = this.contestantsSnapshot.map(cs => cs.dateTimeCaptured).filter(csdtc => csdtc);
    const cSnapshotsMilli = cSnapshotsDateTime.map(csdt => csdt.getMilliseconds());
    const avgCSnapshotsMilli = cSnapshotsMilli.reduce((runningAvg, snapshotMilli) => runningAvg + snapshotMilli) / cSnapshotsDateTime.length;
    return new Date(avgCSnapshotsMilli);
  }
}