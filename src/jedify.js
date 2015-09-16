import Injector from './injector';

function injectServices(obj) {
  console.log('Injecting...');
  for (var prop in obj) {
    var val = obj[prop];
    if (val instanceof Injector) {
      console.log('Injecting ' + val);
      obj[prop] = val.service();
    }
  }
}

export default function jedify(klass) {
  if (klass._jedi) {
    return klass;
  } else {
    var JediClass = class JediClass extends klass {
      constructor(...args) {
        super(...args);
        injectServices(this);
      }
    };

    JediClass._jedi = true;
    return JediClass;
  }
}
