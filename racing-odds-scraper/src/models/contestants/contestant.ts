export type ContestantParams = {
  id: string;
  name: string;
}

export abstract class Contestant {
  id: string;
  name: string;

  constructor({ id, name }: ContestantParams) {
    this.id = id;
    this.name = name;
  }
}