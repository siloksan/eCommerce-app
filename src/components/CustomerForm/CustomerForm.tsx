import Input from 'shared/Input/Input';
import PasswordInput from 'shared/PasswordInput/PasswordInput';
import classes from './CustomerForm.module.scss';
import customerFields from './customerFields';

function CustomerForm() {
  const fieldsElements = customerFields.map((field) => {
    const { label, name, type, validateOptions } = field;
    if (name === 'password') {
      return <PasswordInput key={label} validateOptions={validateOptions} />;
    }
    return <Input label={label} type={type} fieldName={name} key={label} validateOptions={validateOptions} />;
  });

  return (
    <div className={classes.container}>
      <h3>General Information</h3>
      {fieldsElements}
    </div>
  );
}

export default CustomerForm;
