import Injector from './injector';
import { warn } from './debug';

const CONTAINER_KEY = '__container__';

export default class Container {
  constructor() {
    this._instanceRegistry = {};
    this._factoryRegistry = {};
  }

  static containerFor(instance) {
    return instance[CONTAINER_KEY] || new NullContainer();
  }

  static _leech(factory) {
    return function(container, ...args) {
      var instance = new factory(...args);
      instance[CONTAINER_KEY] = container;
      Container._injectServices(instance);
      return instance;
    };
  }

  static _injectServices(obj) {
    var container = Container.containerFor(obj);

    for (var prop in obj) {
      var val = obj[prop];
      if (val instanceof Injector) {
        obj[prop] = val.service(container);
      }
    }
  }

  lookup(name) {
    var instance =
      this._lookupInstance(name) ||
      this._lookupFactory(name)(this);

    this._registerInstance(name, instance);

    return instance;
  }

  _lookupInstance(name) {
    return this._instanceRegistry[name];
  }

  _lookupFactory(name) {
    return this._factoryRegistry[name];
  }

  register(name, factory) {
    this._factoryRegistry[name] = this.constructor._leech(factory);
  }

  _registerInstance(name, instance) {
    this._instanceRegistry[name] = instance;
  }
}

export class NullContainer extends Container {
  lookup(name) {
    warn(`No container was specified at injection time! The "${name}" service will not be available.`);
  }

  register(name, factory) {
    warn(`Do not register services on a null container! The "${name}" service will not be registered.`);
  }
}
