import Injector from './injector';
import { warn } from './debug';

const CONTAINER_KEY = '__container__';

export default class Container {
  constructor() {
    this._registry = {};
  }

  static containerFor(obj) {
    return obj[CONTAINER_KEY] || new NullContainer();
  }

  inject(obj) {
    this._injectServices(obj);
    return obj;
  }

  lookup(name, ...args) {
    var entry = this._lookupEntry(name);

    if (entry == null) {
      warn(`No such service "${name}" registered in this container.`);
      return;
    }

    var { factory, singleton, instantiate, instance } = entry;

    if (instance != null) {
      return instance;
    }

    if (instantiate) {
      instance = this._instantiate(factory, args);
    } else {
      instance = factory;
    }

    if (singleton) {
      entry.instance = instance;
    }

    return instance;
  }

  _lookupEntry(name) {
    return this._registry[name];
  }

  _instantiate(factory, args) {
    var instance = new factory(...args);
    this._injectServices(instance);
    return instance;
  }

  _injectServices(obj) {
    obj[CONTAINER_KEY] = this;

    for (var prop in obj) {
      var val = obj[prop];
      if (val instanceof Injector) {
        obj[prop] = val.service(this);
      }
    }
  }

  register(name, factory, { singleton = true, instantiate = true } = {}) {
    var entry = { factory, singleton, instantiate };
    this._registerEntry(name, entry);
  }

  _registerEntry(name, entry) {
    this._registry[name] = entry;
  }
}

export class NullContainer extends Container {
  inject(obj) {
    warn(`A null container has no registered services!`);
    return super.inject(obj);
  }

  lookup(name) {
    warn(`No container was specified at injection time! The "${name}" service will not be available.`);
  }

  register(name, factory) {
    warn(`Do not register services on a null container! The "${name}" service will not be registered.`);
  }
}
