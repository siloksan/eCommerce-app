import customerService from 'api/services/CustomerService';
import AddressForm from 'components/AddressForm/AddressForm';
import CustomerForm from 'components/CustomerForm/CustomerForm';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ButtonSubmit from 'shared/ButtonSubmit/ButtonSubmit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      defaultShippingAddress: false,
    },
    billing: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
      defaultBillingAddress: false,
    },
  },
};

export type FormData = typeof defaultValues;

function RegistrationForm() {
  const methods = useForm<FormData>({ defaultValues });

  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await customerService.signUp(data, address);
    if (success) navigate('/');
  };

  return (
    <>
      <h1 className={classes.title}>Registration details</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.form_container}>
            <CustomerForm />
            {address.shipping && <AddressForm typeOfAddress="shipping" handleAddressChange={handleAddressChange} />}
            {address.billing && <AddressForm typeOfAddress="billing" handleAddressChange={handleAddressChange} />}
          </div>
          <ButtonSubmit label="Submit" />
        </form>
      </FormProvider>
    </>
  );
}

export default RegistrationForm;
