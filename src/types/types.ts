enum UserStatus {
  registered = 'registered',
  anonymous = 'anonymous',
}

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
};

export type User = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
};

export default UserStatus;
