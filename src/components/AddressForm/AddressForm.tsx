import { useFormContext } from 'react-hook-form';

const addressFields = {
  street: {
    name: 'street',
    type: 'input',
  },
  city: {
    name: 'city',
    type: 'input',
  },
  postalCode: {
    name: 'postalCode',
    type: 'input',
  },
  country: {
    name: 'country',
    type: 'select',
    options: [
      { country: 'France', countryCode: 'FR' },
      { country: 'Germany', countryCode: 'DE' },
    ],
  },
};
export default function AddressForm() {
  const methods = useFormContext();
  // const countryOptions = COUNTRY.map((option) => {
  //   const { country, countryCode } = option;
  //   return <option value={countryCode}>{country}</option>;
  // });

  return (
    <div className="shipping-address">
      <label>
        Street
        <input {...methods.register(addressFields.street.name)} type="text" />
      </label>
      <label>
        City
        <input {...methods.register(addressFields.street.name)} type="text" />
      </label>
      <label>
        Postal code
        <input {...methods.register(addressFields.street.name)} type="text" />
      </label>
      {/* <label>
        Country
        <select {...methods.register(addressFields.street.name)}>{...countryOptions}</select>
      </label> */}
    </div>
  );
}
