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

export interface ProductCardProps {
  id: string;
  productName: string;
  currency: string;
  price: number;
  previousPrice?: number;
  imgLink?: string;
}

export type { UserAuthData, CustomerDraft, SerializedAddress };
