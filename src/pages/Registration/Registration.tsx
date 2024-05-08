import { useForm } from 'react-hook-form';

const COUNTRY = [
  { country: 'France', countryCode: 'FR' },
  { country: 'Germany', countryCode: 'DE' },
];

enum AddressFormField {
  street = 'street',
  city = 'city',
  postalCode = 'postalCode',
  country = 'country',
}

enum FormField {
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  dateOfBirth = 'dateOfBirth',
  address = 'address',
}

interface FormData {
  [FormField.email]: string;
  [FormField.password]: string;
  [FormField.firstName]: string;
  [FormField.lastName]: string;
  [FormField.dateOfBirth]: string;
  [AddressFormField.street]: string;
  [AddressFormField.city]: string;
  [AddressFormField.postalCode]: string;
  [AddressFormField.country]: string;
}

export default function RegistrationPage() {
  const { register } = useForm<FormData>();
  // const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  // console.log('register: ', register);

  const countryOptions = COUNTRY.map((option) => {
    const { country, countryCode } = option;
    return <option value={countryCode}>{country}</option>;
  });

  return (
    <form onSubmit={() => {}}>
      <label>
        E-mail
        <input {...register(FormField.email)} type="text" />
      </label>
      <label>
        Password
        <input {...register(FormField.password)} type="text" />
      </label>
      <label>
        First Name
        <input {...register(FormField.firstName)} type="text" />
      </label>
      <label>
        Last Name
        <input {...register(FormField.lastName)} type="text" />
      </label>
      <label>
        Date of birth
        <input {...register(FormField.dateOfBirth)} type="text" />
      </label>
      <div className="shipping-address">
        <label>
          Street
          <input {...register(AddressFormField.street)} type="text" />
        </label>
        <label>
          City
          <input {...register(AddressFormField.city)} type="text" />
        </label>
        <label>
          Postal code
          <input {...register(AddressFormField.postalCode)} type="text" />
        </label>
        <label>
          Country
          <input {...register(AddressFormField.country)} type="text" />
          <select {...register(AddressFormField.country)}>{...countryOptions}</select>
        </label>
      </div>
      <input type="submit" />
    </form>
  );
}
