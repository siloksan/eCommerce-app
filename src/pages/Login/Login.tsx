import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import Button from 'shared/Button/Button';
import LoginFormFields from 'components/LoginForm/LoginForm';
import useApiContext from 'context/context';

import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.scss';

type FormValues = {
  email: string;
  password: string;
};

function LoginForm() {
  const methods = useForm<FormValues>();

  const { customerService } = useApiContext();

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
          <Button label="Login" />
        </form>
      </FormProvider>
      <p>
        Don&apos;t have an account?{' '}
        <Link to="/register" className={classes.registerLink}>
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
