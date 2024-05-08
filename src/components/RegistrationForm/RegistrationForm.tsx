import AddressForm from 'components/AddressForm/AddressForm';
import CustomerForm from 'components/CustomerForm/CustomerForm';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import classes from './RegistrationForm.module.scss';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function RegistrationForm() {
  const methods = useForm<FormData>();

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FormData> = () => {};
  return (
    <div className={classes.container}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.form_container}>
            <CustomerForm />
            <AddressForm
              title="Shipping address"
              checkbox={{ name: 'defaultShippingAddress', type: 'text', label: 'Default shipping address' }}
            />
            <AddressForm
              title="Billing address"
              checkbox={{ name: 'defaultBillingAddress', type: 'text', label: 'Default billing address' }}
            />
          </div>
          <input type="submit" className={classes.submit} />
        </form>
      </FormProvider>
    </div>
  );
}
