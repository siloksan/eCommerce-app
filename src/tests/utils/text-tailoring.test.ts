import textTailoring from 'utils/helpers/textTailoring';

describe('textTailoring', () => {
  it('should return the input text if it is shorter than the maxChar', () => {
    expect(textTailoring('hello', 10)).toBe('hello');
    expect(textTailoring('hello', 6)).toBe('hello');
  });

  it('should truncate the text to maxChar - 1 and add ellipsis if it is longer than maxChar', () => {
    expect(textTailoring('hello world', 5)).toBe('hell...');
    expect(textTailoring('hello world', 10)).toBe('hello wor...');
  });

  it('should handle empty input', () => {
    expect(textTailoring('', 10)).toBe('');
  });
});
