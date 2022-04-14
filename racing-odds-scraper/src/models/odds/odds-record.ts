import { OddsTable } from "./odds-table";

export class OddsRecord {
  hostnameSource: string;
  oddsTables: OddsTable[] = [];

  constructor(hostnameSource: string) {
    this.hostnameSource = hostnameSource;
  }
}
