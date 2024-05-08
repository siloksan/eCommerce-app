// import AddressForm from 'components/AddressForm/AddressForm';
// import CustomerForm from 'components/CustomerForm/CustomerForm';
// import { customerFields, addressFields } from 'components/RegistrationForm/RegistrationFields';
import { FormProvider, useForm } from 'react-hook-form';

export default function RegistrationForm() {
  const methods = useForm<FormData>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => {}}>
        {/* <CustomerForm customerFields={customerFields} />
        <AddressForm addressFields={addressFields} /> */}
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
