import validateDateOfBirth from 'utils/helpers/dateOfBirthValidate';

const customerFields = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    validateOptions: {
      required: 'E-mail is required',
      maxLength: {
        value: 50,
        message: 'The email must less than 50 characters long!',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
        message: 'Invalid email!',
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    validateOptions: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'The password must at least 8 characters long.',
      },
      maxLength: {
        value: 30,
        message: 'The password must less than 30 characters long!',
      },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
        message: 'The password must include at least one uppercase letter, one lowercase letter, and one number!',
      },
    },
  },
  {
    name: 'firstName',
    type: 'input',
    label: 'First Name',
    validateOptions: {
      required: 'First Name is required',
      pattern: {
        value: /^[A-Z][a-z]{1,20}$/,
        message:
          'The first name must start with an uppercase character and should not contain any special characters or numbers!',
      },
    },
  },
  {
    name: 'lastName',
    type: 'input',
    label: 'Last Name',
    validateOptions: {
      required: 'Last Name is required',
      pattern: {
        value: /^[A-Z][a-z]{1,20}$/,
        message:
          'The last name must start with an uppercase character and should not contain any special characters or numbers!',
      },
    },
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    label: 'Date of birth',
    validateOptions: {
      required: 'Date of birth is required',
      validate: validateDateOfBirth,
    },
  },
];

export default customerFields;
