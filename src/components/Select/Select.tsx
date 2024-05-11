import { useFormContext } from 'react-hook-form';
import classes from './Select.module.scss';

type Option = {
  children: string;
  value: string;
};

interface Props {
  label: string;
  fieldName: string;
  options: Option[];
}

function Select({ label, fieldName, options }: Props) {
  const optionsElement = options.map((option) => {
    const { children, value } = option;
    return (
      <option value={value} key={value}>
        {children}
      </option>
    );
  });
  const { register } = useFormContext();

  return (
    <label className={classes.container}>
      {label}
      <select {...register(fieldName)}>{optionsElement}</select>
    </label>
  );
}

export default Select;
