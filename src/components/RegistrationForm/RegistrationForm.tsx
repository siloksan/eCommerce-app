import AddressForm from 'components/AddressForm/AddressForm';
import client from 'api/client/client';
import CustomerForm from 'components/CustomerForm/CustomerForm';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';
import ButtonSubmit from 'shared/ButtonSubmit/ButtonSubmit';
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

export type FormData = typeof defaultValues;

function RegistrationForm() {
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
  const email = 'user34@example.com';
  const password = 'password';
  const onSubmit: SubmitHandler<FormData> = () => {
    client.apiRoot
      .me()
      .signup()
      .post({
        body: {
          email,
          password,
          firstName: 'John',
          lastName: 'Doe',
        },
      })
      .execute()
      .then(() => {})
      .catch(() => {});
  };

  function signIn() {
    client.apiRoot = client.getApiRoot({ username: email, password });
  }

  function getUser() {
    client.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        JSON.stringify(res.body);
      });
  }

  function logOut() {
    client.tokenCache.clearToken();
    client.apiRoot = client.getApiRoot();
  }

  function getProducts() {
    client.apiRoot
      .products()
      .get()
      .execute()
      .then((res) => {
        JSON.stringify(res.body);
      });
  }

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
          <ButtonSubmit label="Submit" />
        </form>
      </FormProvider>
      <button onClick={signIn} type="button">
        Sign in
      </button>
      <button onClick={getUser} type="button">
        Me
      </button>
      <button onClick={logOut} type="button">
        log out
      </button>
      <button onClick={getProducts} type="button">
        products
      </button>
    </div>
  );
}

export default RegistrationForm;
