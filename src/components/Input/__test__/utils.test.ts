import { blurTransformValue, changeTransformValue } from '../utils';

describe('changeTransformValue function', () => {
  describe('when the type is number', () => {
    test('transforms a valid decimal number string correctly', () => {
      const result = changeTransformValue('number', '1234', '');
      expect(result).toEqual(['1,234', '1234']);
    });

    test('transforms a valid decimal number string correctly2', () => {
      const result = changeTransformValue('number', '1234.56', '');
      expect(result).toEqual(['1,234.56', '1234.56']);
    });

    test('returns null for an invalid number string1', () => {
      const result = changeTransformValue('number', 'abc', '');
      expect(result).toBeNull();
    });

    test('returns null for an invalid number string2', () => {
      const result = changeTransformValue('number', '12a.2', '');
      expect(result).toBeNull();
    });

    test('ignore space in value', () => {
      const result = changeTransformValue('number', '12 .2', '12.2');
      expect(result).toBeNull();
    });

    test('ignore more than 1 dot', () => {
      let result = changeTransformValue('number', '12..2', '12.2');
      expect(result).toBeNull();
      result = changeTransformValue('number', '12.2.', '12.2');
      expect(result).toBeNull();
      result = changeTransformValue('number', '1.2.2', '12.2');
      expect(result).toBeNull();
    });

    test('returns null for a number string that is the same as the previous value', () => {
      const result = changeTransformValue('number', '1,234.56', '1,234.56');
      expect(result).toBeNull();
    });
  });

  describe('when the type is not number', () => {
    test('transforms a string correctly for a type other than number', () => {
      const result = changeTransformValue('text', 'test', '');
      expect(result).toEqual(['test', 'test']);
    });

    test('returns null for a string that is the same as the previous value for a type other than number', () => {
      const result = changeTransformValue('text', 'test', 'test');
      expect(result).toBeNull();
    });
  });
});

describe('blurTransformValue function', () => {
  describe('when the type is number', () => {
    test('return with min length of decimal to be 2 when there is decimal', () => {
      let result = blurTransformValue('number', '1.1', '');
      expect(result).toEqual(['1.10', '1.10']);
      result = blurTransformValue('number', '1.', '');
      expect(result).toEqual(['1.00', '1.00']);
    });

    test('returns null for a number string that is the same as the previous value', () => {
      const result = blurTransformValue('number', '1,234.56', '1,234.56');
      expect(result).toBeNull();
    });
  });

  describe('when the type is not number', () => {
    test('transforms a string correctly for a type other than number', () => {
      const result = blurTransformValue('text', 'test', '');
      expect(result).toEqual(['test', 'test']);
    });

    test('returns null for a string that is the same as the previous value for a type other than number', () => {
      const result = blurTransformValue('text', 'test', 'test');
      expect(result).toBeNull();
    });
  });
});
