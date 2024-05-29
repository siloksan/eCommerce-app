import { useState, useEffect } from 'react';
import classes from './UserProfile.module.scss';
import userData from './userData';
import { User } from '../../types/types';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(userData);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
        {user.addresses.map((address) => (
          <div className={classes.address}>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
            {address.isDefaultBilling && <span className={classes.defaultBilling}>Default Billing Address</span>}
            {address.isDefaultShipping && <span className={classes.defaultShipping}>Default Shipping Address</span>}
          </div>
        ))}
      </section>
    </div>
  );
}
