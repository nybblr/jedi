import Jedi from './jedi';

@Jedi.inject('cookies')
class Human {
  talk() {
    console.log('Ich habe hunger!');
  }
}

@Jedi.inject('water')
@Jedi.inject('milk', 'milch')
class Baby extends Human {
  talk() {
    console.log('WAAAAAAAA');
  }
}

class Cookies extends Jedi.Service {
  munch() {
    console.log('Munch munch munch');
  }
}

export { Human, Baby, Cookies };
