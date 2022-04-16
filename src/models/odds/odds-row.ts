import { Contestant } from "../contestants/contestant";
import { Odd } from "./odd";

export class OddsRow {
  forContestant: Contestant;
  entryOdds: Odd[] = [];

  constructor(forContestant: Contestant) {
    this.forContestant = forContestant;
  }
}
