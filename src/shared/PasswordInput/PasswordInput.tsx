import { useState } from 'react';
import { RegisterOptions } from 'react-hook-form';
import Input from 'shared/Input/Input';
import ShowPasswordButton from 'shared/ShowPassword/ShowPassword';

interface Props {
  validateOptions?: RegisterOptions;
}

function PasswordInput({ validateOptions = {} }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      fieldName="password"
      validateOptions={validateOptions}
      autoComplete="current-password"
    >
      <ShowPasswordButton showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
    </Input>
  );
}

export default PasswordInput;
