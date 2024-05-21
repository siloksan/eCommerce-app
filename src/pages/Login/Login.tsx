import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import ButtonSubmit from 'shared/ButtonSubmit/ButtonSubmit';
import LoginFormFields from 'components/LoginForm/LoginForm';

import classes from './Login.module.scss';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const methods = useForm<FormValues>();

  const { handleSubmit } = methods;
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginFormFields />
          <ButtonSubmit label="Login" />
        </form>
      </FormProvider>
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
