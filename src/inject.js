import Injector from './injector';

export default function inject(property, service) {
  service = service || property;

  return (klass) => {
    klass.prototype[property] = new Injector(service);
    return klass;
  };
};
