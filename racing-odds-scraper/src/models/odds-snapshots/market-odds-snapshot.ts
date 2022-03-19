import { ContestantOddsSnapshot, OddsSnapshot } from "./odds-snapshot";

type ContestantMarketOddsSnapshot = ContestantOddsSnapshot & {
  moneyMatched: number;
  moneyUnmatched: number;
}

export class MarketOddsSnapshot extends OddsSnapshot {
  
}