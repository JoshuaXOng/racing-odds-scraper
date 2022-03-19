import { v4 as uuidv4 } from "uuid";

type VenueParams = {
  id: string;
  name: string;
  country: string;
}

export class Venue {
  private id: string;
  private name: string;
  private country: string;

  constructor({ id, name, country }: VenueParams) {
    this.id = id;
    this.name = name;
    this.country = country;
  }
  static initWRandomId(name: string, country: string) {
    const id = uuidv4();
    return new Venue({ id, name, country });
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getCountry() {
    return this.country;
  }
}