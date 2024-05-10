import Input from 'components/Input/Input';
import { useFormContext } from 'react-hook-form';
import classes from './CustomerForm.module.scss';

const customerFields = [
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
  {
    name: 'firstName',
    type: 'input',
    label: 'First Name',
  },
  {
    name: 'lastName',
    type: 'input',
    label: 'Last Name',
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    label: 'Date of birth',
  },
];

function CustomerForm() {
  const { register } = useFormContext();

  const fieldsElements = customerFields.map((field) => {
    const { label, name, type } = field;
    return <Input {...register} label={label} type={type} fieldName={name} key={label} />;
  });

  return <div className={classes.container}>{fieldsElements}</div>;
}

export default CustomerForm;
