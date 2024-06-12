import { User } from '../../types/types';

const userData: User = {
  firstName: 'FirstName',
  lastName: 'lastName',
  dateOfBirth: '2000-01-01',
  addresses: [
    {
      street: 'October',
      city: 'Paris',
      state: '',
      zipCode: '12345',
      country: 'France',
      isDefaultBilling: true,
      isDefaultShipping: false,
    },
    {
      street: 'October',
      city: 'Paris',
      state: '',
      zipCode: '12345',
      country: 'France',
      isDefaultBilling: true,
      isDefaultShipping: false,
    },
    {
      street: 'Gran Via',
      city: 'Madrid',
      state: '',
      zipCode: '67890',
      country: 'Spain',
      isDefaultBilling: false,
      isDefaultShipping: true,
    },
    {
      street: 'Gran Via',
      city: 'Madrid',
      state: '',
      zipCode: '67890',
      country: 'Spain',
      isDefaultBilling: false,
      isDefaultShipping: true,
    },
  ],
};

export default userData;
