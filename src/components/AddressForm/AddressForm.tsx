import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import { useFormContext } from 'react-hook-form';

import classes from './AddressForm.module.scss';

type Option = {
  country: string;
  countryCode: string;
};

type Field = {
  name: string;
  type: string;
  label: string;
  options?: Option[];
};

const addressFields: Field[] = [
  {
    name: 'street',
    type: 'text',
    label: 'Street',
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
  },
  {
    name: 'postalCode',
    type: 'text',
    label: 'Postal code',
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    options: [
      { country: 'France', countryCode: 'FR' },
      { country: 'Germany', countryCode: 'DE' },
    ],
  },
];

interface Props {
  title: string;
  checkbox: Field;
}

export default function AddressForm({ title, checkbox }: Props) {
  const { register } = useFormContext();

  const fieldsElements = addressFields.map((field) => {
    const { label, name, options, type } = field;
    if (options) {
      return <Select {...register} label={label} fieldName={name} options={options} key={label} />;
    }
    return <Input {...register} label={label} type={type} fieldName={name} key={label} />;
  });

  return (
    <div className={classes.container}>
      <h3>{title}</h3>
      {fieldsElements}
      <Input {...register} label={checkbox.label} type="checkbox" fieldName={checkbox.name} />
    </div>
  );
}
