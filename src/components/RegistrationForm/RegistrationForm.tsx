import AddressForm from 'components/AddressForm/AddressForm';
import CustomerForm from 'components/CustomerForm/CustomerForm';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';
import classes from './RegistrationForm.module.scss';

// определяю структуру для полей регистрациии

const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: {
    shipping: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
      defaultShippingAddress: '',
    },
    billing: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
      defaultBillingAddress: '',
    },
  },
};

type FormData = typeof defaultValues;

export default function RegistrationForm() {
  const methods = useForm<FormData>({ defaultValues });

  /* для отслеживания состояния какой из адрессов будет применён как общий для доставки и выставления счёта.
  если один из них false, то со значением true будет общий адресс.
  */

  const [address, setAddress] = useState({
    shipping: true,
    billing: true,
  });

  const handleAddressChange = (addressType: 'shipping' | 'billing'): void => {
    if (addressType === 'shipping') {
      setAddress({
        ...address,
        billing: !address.billing,
      });
    } else {
      setAddress({
        ...address,
        shipping: !address.shipping,
      });
    }
  };

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FormData> = () => {};
  return (
    <div className={classes.container}>
      <h1>Registration details</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.form_container}>
            <CustomerForm />
            {address.shipping && <AddressForm typeOfAddress="shipping" handleAddressChange={handleAddressChange} />}
            {address.billing && <AddressForm typeOfAddress="billing" handleAddressChange={handleAddressChange} />}
          </div>
          <input type="submit" className={classes.submit} />
        </form>
      </FormProvider>
    </div>
  );
}
