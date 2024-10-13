// test/math.test.js
const chai = require('chai');
const expect = chai.expect;
const math = require('../math');

describe('Math Functions', () => {
  describe('add()', () => {
    it('should return 3 when adding 1 and 2', () => {
      const result = math.add(1, 2);
      expect(result).to.equal(3);
    });

    it('should return 0 when adding -1 and 1', () => {
      const result = math.add(-1, 1);
      expect(result).to.equal(0);
    });

    it('should return -1 when adding -1 and 0', () => {
      const result = math.add(-1, 0);
      expect(result).to.equal(-1);
    });
  });
});
