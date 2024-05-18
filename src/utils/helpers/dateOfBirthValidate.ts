function validateDateOfBirth(dateOfBirth: string): string | boolean {
  const minAge = 13;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const thirteenYearsAgo = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  return thirteenYearsAgo.getTime() > birthDate.getTime() || 'You are too young';
}

export default validateDateOfBirth;
