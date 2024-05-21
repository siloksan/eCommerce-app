import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import styles from './Select.module.scss';

type Option = {
  children: string;
  value: string;
};

interface Props {
  label: string;
  fieldName: string;
  options: Option[];
  validateOptions?: RegisterOptions;
}

function Select({ label, fieldName, options, validateOptions = {} }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const optionsElement = options.map((option) => {
    const { children, value } = option;
    return (
      <option value={value} key={value}>
        {children}
      </option>
    );
  });

  return (
    <label className={styles.container}>
      {label}
      <select {...register(fieldName, validateOptions)}>{optionsElement}</select>
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => <p className={styles.error}>{message}</p>}
      />
    </label>
  );
}

export default Select;
