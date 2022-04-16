export class OddsRecord {
  constructor(targetInterval, targetType) {
    this.snapshots = [];
    this.targetInterval = targetInterval;
    this.targetType = targetType;
  }
  getLastSnapshot() {
    const length = this.snapshots.length;
    if (length === 0) return undefined;
    return this.snapshots[length - 1];
  }
  addSnapshot(snapshot) {
    const lastSnapshot = this.getLastSnapshot();
    if (!lastSnapshot) {
      this.snapshots.push(snapshot);
      return;
    }
    this.snapshots.push(snapshot);
  }
  getAverageInterval() {
    if (this.snapshots.length <= 1) return undefined;
  }
  getNormalizedOddsRecord(interval) {}
}
//# sourceMappingURL=odds-record.js.map
