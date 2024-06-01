interface UserAuthData {
  username: string;
  password: string;
}

interface SerializedAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: SerializedAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

interface Address {
  id?: string;
  streetName?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export type { UserAuthData, CustomerDraft, SerializedAddress, UserData };
