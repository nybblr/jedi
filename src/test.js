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

export { Human, Baby };
