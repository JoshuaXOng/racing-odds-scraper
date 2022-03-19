export class OddsRecord {
    constructor(targetInterval, targetType) {
        this.snapshots = [];
        this.targetInterval = targetInterval;
        this.targetType = targetType;
    }
    getLastSnapshot() {
        const length = this.snapshots.length;
        if (length === 0)
            return undefined;
        return this.snapshots[length - 1];
    }
    addSnapshot(snapshot) {
        const lastSnapshot = this.getLastSnapshot();
        if (!lastSnapshot) {
            this.snapshots.push(snapshot);
            return;
        }
        if (lastSnapshot.getAverageDateTimeCaptured().getTime() <= snapshot.getAverageDateTimeCaptured().getTime()) {
            throw new Error("Cannot add odd snapshot to record as it is out of time order.");
        }
        this.snapshots.push(snapshot);
    }
    getAverageInterval() {
        if (this.snapshots.length <= 1)
            return undefined;
        return this.snapshots[1].getAverageDateTimeCaptured().getTime() - this.snapshots[0].getAverageDateTimeCaptured().getTime();
    }
    getNormalizedOddsRecord(interval) {
    }
}
//# sourceMappingURL=odds-record.js.map