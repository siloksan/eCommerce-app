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
  addresses: SerializedAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export type { UserAuthData, CustomerDraft, SerializedAddress };
