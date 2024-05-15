import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './Login.module.scss';

type FormValues = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [redirectToMain, setRedirectToMain] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = () => {
    setRedirectToMain(true);
  };

  if (redirectToMain) {
    window.location.href = '/main';
    return null;
  }

  return (
    <div className={classes.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form}>
          <label htmlFor="email">Email:</label>
          <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} id="email" />
          {errors.email && <span>Email is required and must be valid</span>}
        </div>
        <div className={classes.form}>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password', { required: true, minLength: 6 })} id="password" />
          {errors.password && <span>Password is required and must be at least 6 characters</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginPage;
