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
  key: string;
  productName: string;
  currency: string;
  price: number;
  discountedPrice?: number;
  imgLink?: string;
  description?: string;
}

export type { UserAuthData, CustomerDraft, SerializedAddress };
