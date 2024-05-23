import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import ButtonSubmit from 'shared/ButtonSubmit/ButtonSubmit';
import LoginFormFields from 'components/LoginForm/LoginForm';
import customerService from 'api/services/CustomerService';

import { useNavigate } from 'react-router-dom';
import classes from './Login.module.scss';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const methods = useForm<FormValues>();

  const navigate = useNavigate();

  const { handleSubmit } = methods;
  const [redirectToMain, setRedirectToMain] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const isAuthorized = await customerService.signIn({ username: data.email, password: data.password });
    if (isAuthorized) {
      setRedirectToMain(true);
      navigate('/');
    }
  };

  if (redirectToMain) {
    navigate('/');
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
