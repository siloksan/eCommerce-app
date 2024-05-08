import { useFormContext } from 'react-hook-form';
import classes from './Select.module.scss';

type Option = {
  country: string;
  countryCode: string;
};

interface Props {
  label: string;
  fieldName: string;
  options: Option[];
}

function Select({ label, fieldName, options }: Props) {
  const optionsElement = options.map((option) => {
    const { country, countryCode } = option;
    return (
      <option value={countryCode} key={country}>
        {country}
      </option>
    );
  });
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className={classes.container}>
      {label}
      <select {...register(fieldName)}>{optionsElement}</select>
      {errors[fieldName] ? (
        <span className={classes.error}>errors[fieldName].message</span>
      ) : (
        <span className={classes.error}>An error message will appear here</span>
      )}
    </label>
  );
}

export default Select;
