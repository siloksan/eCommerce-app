import Input from 'shared/Input/Input';
import classes from './CustomerForm.module.scss';
import customerFields from './customerFields';

function CustomerForm() {
  const fieldsElements = customerFields.map((field) => {
    const { label, name, type, validateOptions } = field;
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
