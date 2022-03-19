export class Commission {
  value: number;
  toDecimal() {};
  toPercentage() {};
}

export class CommisionEvent extends Event {
  commision: Commission;
}