import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './Login.module.scss';
import LoginFormFields from '../../components/LoginForm/LoginForm';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
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
        <LoginFormFields register={register} errors={errors} />
        <button type="submit" className={classes.submitBtn}>
          Login
        </button>
      </form>
      <p>
        Don&apos;t have an account?{' '}
        <a className={classes.link} href="/register">
          Register
        </a>
      </p>
    </div>
  );
}

export default LoginForm;
