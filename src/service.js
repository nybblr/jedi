export default class Service {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `<Service:${this.name}>`;
  }
}
