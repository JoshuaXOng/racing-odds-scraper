import { OddsSnapshot } from "./odds-snapshots/odds-snapshot";

export type TargetType = "strict" | "range" | "free";

export class OddsRecord {
  private snapshots: OddsSnapshot[] = [];
  private targetInterval: number;
  private targetType: TargetType;
  
  constructor(targetInterval: number, targetType: TargetType) {
    this.targetInterval = targetInterval;
    this.targetType = targetType;
  }

  private getLastSnapshot() {
    const length = this.snapshots.length;
    if (length === 0)
      return undefined;
    return this.snapshots[length-1];
  }

  addSnapshot(snapshot: OddsSnapshot) {
    const lastSnapshot = this.getLastSnapshot();
    if (!lastSnapshot) {
      this.snapshots.push(snapshot);
      return;
    }

    // if (lastSnapshot.getAverageDateTimeCaptured().getTime() <= snapshot.getAverageDateTimeCaptured().getTime()) {
    //   throw new Error("Cannot add odd snapshot to record as it is out of time order.");
    // }
    this.snapshots.push(snapshot);
  }

  getAverageInterval() {
    if (this.snapshots.length <= 1) 
      return undefined;

    // return this.snapshots[1].getAverageDateTimeCaptured().getTime() - this.snapshots[0].getAverageDateTimeCaptured().getTime(); // Placeholder
  }

  getNormalizedOddsRecord(interval: number) {

  }
}