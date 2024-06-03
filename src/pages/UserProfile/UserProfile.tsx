import { useState, useEffect } from 'react';
import useApiContext from 'context/context';
import formatUserData from 'utils/helpers/formatUserData';
import { UserData } from 'types/customer-interfaces';
import classes from './UserProfile.module.scss';
import CustomLoader from '../../shared/Loader/loader';

export default function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);

  const { customerService } = useApiContext();

  useEffect(() => {
    async function fetchProduct() {
      const result = await customerService.getUserData();
      if (result) {
        const serializeUserData = formatUserData(result);
        setUser(serializeUserData);
      }
    }
    fetchProduct();
  }, [customerService]);

  if (!user) {
    return <div>{CustomLoader}</div>;
  }

  return (
    <div className={classes.container}>
      <h2>User Profile</h2>
      <section className={classes.personalInfo}>
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </p>
      </section>
      <section className={classes.addresses}>
        <h3>Addresses</h3>
        {user.addresses &&
          user.addresses.map((address) => {
            const { defaultBillingAddressId, defaultShippingAddressId } = user;
            const isDefaultBilling = defaultBillingAddressId === address.id;
            const isDefaultShipping = defaultShippingAddressId === address.id;
            return (
              <div className={classes.address}>
                <p>Street: {address.streetName}</p>
                <p>
                  City: {address.city}, {address.state} Postal code: {address.postalCode}
                </p>
                <p>{address.country === 'DE' ? 'Germany' : 'France'}</p>
                {isDefaultBilling && <span className={classes.defaultBilling}>Default Billing Address</span>}
                {isDefaultShipping && <span className={classes.defaultShipping}>Default Shipping Address</span>}
              </div>
            );
          })}
      </section>
    </div>
  );
}
