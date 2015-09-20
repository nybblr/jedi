import Service from './service';

export default class Injector {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `<Injector:${this.name}>`;
  }

  service(container) {
    return container.lookup(this.name);
  }
}
