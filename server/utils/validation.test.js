const expect = require('expect');
const {isRealString} = require('../utils/validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(true);
        expect(res).toBe(false);
    });

    it('Should reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });

    it('Should allow string with non-space characters', () => {
        var res = isRealString('  Opa  ');
        expect(res).toBe(true);
    });
});

