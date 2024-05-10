import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import { useFormContext } from 'react-hook-form';

import classes from './AddressForm.module.scss';

const addressFields = [
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
  typeOfAddress: 'billing' | 'shipping';
  handleAddressChange: (addressType: 'billing' | 'shipping') => void;
}

export default function AddressForm({ typeOfAddress, handleAddressChange }: Props) {
  const { register } = useFormContext();

  const fieldKey = `addresses.${typeOfAddress}.`;

  const schema = {
    shipping: {
      title: 'Shipping address',
      checkboxName: 'defaultShippingAddress',
      checkboxLabel: 'Default shipping address',
    },
    billing: {
      title: 'Billing address',
      checkboxName: 'defaultBillingAddress',
      checkboxLabel: 'Default billing address',
    },
  };

  const handleChange = () => {
    handleAddressChange(typeOfAddress);
  };
  const fieldsElements = addressFields.map((field) => {
    const { label, name, options, type } = field;
    if (options) {
      return <Select {...register} label={label} fieldName={`${fieldKey}${name}`} options={options} key={label} />;
    }
    return <Input {...register} label={label} type={type} fieldName={`${fieldKey}${name}`} key={label} />;
  });

  return (
    <div className={classes.container}>
      <h3>{schema[typeOfAddress].title}</h3>
      {fieldsElements}
      <Input
        {...register}
        label={schema[typeOfAddress].checkboxLabel}
        type="checkbox"
        fieldName={`${fieldKey}${schema[typeOfAddress].checkboxName}`}
      />
      <label>
        Set the same billing and shipping address
        <input type="checkbox" onChange={handleChange} />
      </label>
    </div>
  );
}
