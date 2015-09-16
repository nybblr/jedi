import Service from './service';

export default class Injector {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `<Injector:${this.name}>`;
  }

  service() {
    return new Service(this.name);
  }
}
