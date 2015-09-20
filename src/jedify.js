import Injector from './injector';
import Container from './container';

function injectServices(obj) {
  var container = Container.containerFor(obj);

  for (var prop in obj) {
    var val = obj[prop];
    if (val instanceof Injector) {
      obj[prop] = val.service(container);
    }
  }
}

function injectConstructor(klass) {
  return class JediClass extends klass {
    constructor(...args) {
      super(...args);
      injectServices(this);
    }
  };
}

export default function jedify(klass) {
  if (klass._jedi) {
    return klass;
  } else {
    var JediClass = injectConstructor(klass);

    JediClass._jedi = true;
    return JediClass;
  }
}
