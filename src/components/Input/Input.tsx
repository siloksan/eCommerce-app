import { useFormContext } from 'react-hook-form';
import classes from './Input.module.scss';

interface Props {
  label: string;
  fieldName: string;
  type: string;
}

function Input({ label, fieldName, type }: Props) {
  const {
    register,
    // formState: { errors },
  } = useFormContext();

  return (
    <label className={classes.container}>
      {label}
      <input {...register(fieldName)} type={type} />
      {/* {errors[fieldName] ? (
        <span className={classes.error}>{errors[fieldName].message}</span>
      ) : (
        <span className={classes.error}>An error message will appear here</span>
      )} */}
    </label>
  );
}

export default Input;
