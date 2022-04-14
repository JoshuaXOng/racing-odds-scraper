import { OddsRow } from "./odds-row";

export class OddsTable {
  datetimeCaptured: Date;
  oddsRows: OddsRow[] = [];

  constructor(datetimeCaptured: Date) {
    this.datetimeCaptured = datetimeCaptured;
  }
}
