export type ContestantParams = {
  name: string;
}

export class Contestant {
  name: string;

  constructor({ name }: ContestantParams) {
    this.name = name;
  }
}