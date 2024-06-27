import validateDateOfBirth from 'utils/helpers/dateOfBirthValidate';

describe('validateDateOfBirth', () => {
  it('should return true for a valid birth date (older than 13 years)', () => {
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 14);
    expect(validateDateOfBirth(validDate.toISOString())).toBe(true);
  });

  it('should return "You are too young" for an invalid birth date (younger than 13 years)', () => {
    const invalidDate = new Date();
    invalidDate.setFullYear(invalidDate.getFullYear() - 12);
    expect(validateDateOfBirth(invalidDate.toISOString())).toBe('You are too young');
  });
});
