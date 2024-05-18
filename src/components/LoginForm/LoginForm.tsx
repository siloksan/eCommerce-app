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
  return (
    <>
      <div className={classes.field}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={classes.input}
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className={classes.error}>{errors.email.message}</span>}
      </div>
      <div className={classes.field}>
        <label htmlFor="password" className={classes.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={classes.input}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span className={classes.error}>{errors.password.message}</span>}
      </div>
    </>
  );
}

export default LoginFormFields;
