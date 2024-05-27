import Select from 'shared/Select/Select';
import Input from 'shared/Input/Input';
import Checkbox from 'shared/CheckBox/Checkbox';
import { useFormContext } from 'react-hook-form';
import classes from './AddressForm.module.scss';
import addressFields from './addressFields';

interface Props {
  typeOfAddress: 'billing' | 'shipping';
  handleAddressChange: (addressType: 'billing' | 'shipping') => void;
}

export default function AddressForm({ typeOfAddress, handleAddressChange }: Props) {
  const fieldKey = `addresses.${typeOfAddress}.`;

  const { register } = useFormContext();

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

  // функция устанавливает какой из адрессов будет общим

  const handleChange = () => {
    handleAddressChange(typeOfAddress);
  };

  const fieldsElements = addressFields.map((field) => {
    const { label, name, options, type, validateOptions } = field;
    if (options) {
      return (
        <Select
          label={label}
          fieldName={`${fieldKey}${name}`}
          options={options}
          key={label}
          validateOptions={validateOptions}
        />
      );
    }
    return (
      <Input label={label} type={type} fieldName={`${fieldKey}${name}`} key={label} validateOptions={validateOptions} />
    );
  });

  return (
    <div className={classes.container}>
      <h3>{schema[typeOfAddress].title}</h3>
      {fieldsElements}
      <Checkbox
        label={schema[typeOfAddress].checkboxLabel}
        register={register}
        fieldName={`${fieldKey}${schema[typeOfAddress].checkboxName}`}
      />
      <Checkbox label="Set the same billing and shipping address" handleChange={handleChange} />
    </div>
  );
}
