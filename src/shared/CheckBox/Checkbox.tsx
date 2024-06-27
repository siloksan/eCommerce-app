import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Checkbox.module.scss';

interface Props {
  label: string;
  register?: UseFormRegister<FieldValues>;
  fieldName?: string;
  handleChange?: () => void;
}

function Checkbox({ label, register, fieldName, handleChange }: Props) {
  const additionalProp = register && fieldName ? register(fieldName) : {};

  return (
    <label className={styles.label}>
      {label}
      <input type="checkbox" className={styles.input} {...additionalProp} onChange={handleChange} />
      <span className={styles.checkmark} />
    </label>
  );
}

export default Checkbox;
