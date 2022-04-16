import { Event } from "./event";

export class Venue {
  name: string;
  country: string;
  events: Event[] = [];

  constructor(name: string, country: string) {
    this.name = name; 
    this.country = country;
  }
}
