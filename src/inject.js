import Injector from './injector';
import jedify from './jedify';

export default function inject(property, service) {
  service = service || property;

  return (klass) => {
    klass = jedify(klass);
    klass.prototype[property] = new Injector(service);
    return klass;
  };
};
