export class Currency {
}
export class Odd {
    constructor(value) {
        this.value = value;
    }
    toDecimal() {
        return this.value;
    }
    toFraction() {
    }
}
export class OddsSnapshot {
    wasContestantSnapshotAlreadyEntered(contestantSnapshot) {
        const contestantId = contestantSnapshot.contestant.id;
        const potentialDuplicateSnapshot = this.contestantsSnapshot.map(co => co.contestant).find(c => c.id === contestantId);
        if (potentialDuplicateSnapshot && contestantId)
            return true;
        else
            return false;
    }
    addContestantOddsSnapshot(contestantSnapshot) {
        const wasContestantSnapshotAlreadyEntered = this.wasContestantSnapshotAlreadyEntered(contestantSnapshot);
        if (wasContestantSnapshotAlreadyEntered) {
            throw new Error("Cannot add new contestant snapshot as one already exists with the same Contestant ID.");
        }
        this.contestantsSnapshot.push(contestantSnapshot);
    }
    addContestantsOddSnapshot(contestantsSnapshot) {
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
//# sourceMappingURL=odds-snapshot.js.map