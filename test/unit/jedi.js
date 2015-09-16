import Jedi from '../../src/jedi';
import { Human, Baby } from '../../src/test';

window.Human = Human;
window.Baby = Baby;

var human, baby;

describe('jedi', () => {
  describe('inject', () => {
    beforeEach(() => {
      human = new Human();
      baby = new Baby();
    });

    context('maintains inheritance', () => {
      it('human is a human', () => {
        expect(human).to.be.instanceOf(Human);
      });

      it('baby is a human', () => {
        expect(baby).to.be.instanceOf(Human);
      });

      it('human is not a baby', () => {
        expect(human).to.not.be.instanceOf(Baby);
      });
    });

    context('top level class', () => {
      it('adds cookies injector to class prototype', () => {
        expect(Human.prototype.cookies).to.be.instanceOf(Jedi.Injector);
      });
    });

    context('subclass', () => {
      it('adds cookies injector to class prototype', () => {
        expect(Baby.prototype.cookies).to.be.instanceOf(Jedi.Injector);
      });

      it('adds milk injector to class prototype', () => {
        expect(Baby.prototype.milk).to.be.instanceOf(Jedi.Injector);
      });
    });

    context('constructed object', () => {
      it('injects service', () => {
        expect(human.cookies).to.be.instanceOf(Jedi.Service);
      });

      context('subclass', () => {
        it('injects service', () => {
          expect(baby.water).to.be.instanceOf(Jedi.Service);
        });

        it('injects inherited service', () => {
          expect(baby.cookies).to.be.instanceOf(Jedi.Service);
        });
      });

      context('alternate property name', () => {
        it('injects service at specified property name', () => {
          expect(baby.milk).to.be.instanceOf(Jedi.Service);
          expect(baby.milk.name).to.eq('milch');
        });
      });
    });
  });
});
