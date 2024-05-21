import Select from 'shared/Select/Select';
import Input from 'shared/Input/Input';
import classes from './AddressForm.module.scss';
import addressFields from './addressFields';

interface Props {
  typeOfAddress: 'billing' | 'shipping';
  handleAddressChange: (addressType: 'billing' | 'shipping') => void;
}

export default function AddressForm({ typeOfAddress, handleAddressChange }: Props) {
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
      <Input
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
