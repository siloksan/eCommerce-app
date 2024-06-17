interface ProductPrice {
  price: string;
  currencyCode: string;
}

interface Product {
  id: string;
  title?: string;
  description?: string;
  images?: string[];
  prices: ProductPrice[];
  discountedPrice?: number;
}

export type { Product, ProductPrice };
