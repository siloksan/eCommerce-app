import Input from 'shared/Input/Input';
import PasswordInput from 'shared/PasswordInput/PasswordInput';
import loginValidates from './loginValidate';

function LoginFormFields() {
  return (
    <>
      <Input
        label="Email"
        type="email"
        fieldName="email"
        validateOptions={loginValidates.email}
        autoComplete="username"
      />
      <PasswordInput validateOptions={loginValidates.password} />
    </>
  );
}

export default LoginFormFields;
