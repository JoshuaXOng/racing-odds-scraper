import { Contestant, ContestantParams } from "./contestant";

type RacingContestantParams = ContestantParams & {
  horseName: string;
}

export class RacingContestant extends Contestant {
  horseName: string;
  constructor({ name, horseName }: RacingContestantParams) {
    super({ name });
    this.horseName = horseName;
  }
}
