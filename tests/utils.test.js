const { sum, capitalize } = require('../utils');

describe('Utils', () => {
    it('should correctly sum two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('should correctly capitalize a string', () => {
        expect(capitalize('hello')).toBe('Hello');
    });
});

