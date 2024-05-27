const loginValidates = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: 'Invalid email!',
    },
    maxLength: {
      value: 50,
      message: 'The email must less than 50 characters long!',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
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
};

export default loginValidates;
