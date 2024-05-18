import { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import classes from './LoginForm.module.scss';

interface FormValues {
  email: string;
  password: string;
}

interface LoginFormFieldsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

function LoginFormFields({ register, errors }: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className={classes.field}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="username"
          className={classes.input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address format',
            },
            validate: {
              hasAtSymbol: (value) => value.includes('@') || 'Email must contain "@" symbol',
              noLeadingTrailingWhitespace: (value) =>
                value.trim() === value || 'Email must not contain leading or trailing whitespace',
            },
          })}
        />
        {errors.email && <span className={classes.error}>{errors.email.message}</span>}
      </div>
      <div className={classes.field}>
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <div className={classes.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            className={classes.input}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              validate: {
                hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                hasLowercase: (value) => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                hasDigit: (value) => /\d/.test(value) || 'Password must contain at least one digit',
                noLeadingTrailingWhitespace: (value) =>
                  value.trim() === value || 'Password must not contain leading or trailing whitespace',
                hasSpecialChar: (value) =>
                  /[!@#$%^&*]/.test(value) || 'Password must contain at least one special character',
              },
            })}
          />
          <button type="button" onClick={togglePasswordVisibility} className={classes.togglePassword}>
            {showPassword ? <div className={classes.showPassword} /> : <div className={classes.hidePassword} />}
          </button>
        </div>
        {errors.password && <span className={classes.error}>{errors.password.message}</span>}
      </div>
    </>
  );
}

export default LoginFormFields;
