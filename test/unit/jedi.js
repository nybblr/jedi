import jedi from '../../src/jedi';

describe('jedi', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(jedi, 'greet');
      jedi.greet();
    });

    it('should have been run once', () => {
      expect(jedi.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(jedi.greet).to.have.always.returned('hello');
    });
  });
});
