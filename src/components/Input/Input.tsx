import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Input.module.scss';

interface Props {
  label: string;
  fieldName: string;
  type: string;
  validateOptions?: RegisterOptions;
}

function Input({ label, fieldName, type, validateOptions = {} }: Props) {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext();

  const { invalid } = getFieldState(fieldName);

  return (
    <label className={styles.container}>
      {label}
      <input {...register(fieldName, validateOptions)} type={type} className={invalid ? styles.input_error : ''} />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => <p className={styles.error}>{message}</p>}
      />
    </label>
  );
}

export default Input;
