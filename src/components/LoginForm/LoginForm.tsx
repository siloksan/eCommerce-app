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
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: 'Invalid email!',
            },
            maxLength: {
              value: 50,
              message: 'The email must less than 50 characters long!',
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
              maxLength: {
                value: 30,
                message: 'The password must less than 30 characters long!',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
                message:
                  'The password must include at least one uppercase letter, one lowercase letter, and one number!',
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
