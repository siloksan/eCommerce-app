import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './Input.module.scss';

interface Props {
  label: string;
  fieldName: string;
  type: string;
  validateOptions?: RegisterOptions;
  autoComplete?: string;
  children?: JSX.Element;
}

function Input({ label, fieldName, type, validateOptions = {}, autoComplete = '', children }: Props) {
  const {
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext();

  const { invalid } = getFieldState(fieldName);

  let inputClassName = styles.input;

  if (invalid) {
    inputClassName += ` ${styles.input_error}`;
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        <div className={styles.input_container}>
          <input
            {...register(fieldName, validateOptions)}
            type={type}
            className={inputClassName}
            autoComplete={autoComplete}
          />
          {children}
        </div>
        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </label>
    </div>
  );
}

export default Input;
