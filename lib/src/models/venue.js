import { v4 as uuidv4 } from "uuid";
export class Venue {
  constructor({ id, name, country }) {
    this.id = id;
    this.name = name;
    this.country = country;
  }
  static initWRandomId(name, country) {
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
//# sourceMappingURL=venue.js.map
