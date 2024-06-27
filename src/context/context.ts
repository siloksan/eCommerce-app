import { client, type Client } from 'api/client/client';
import { cartService, CartService } from 'api/services/CartService';
import { customerService, type CustomerService } from 'api/services/CustomerService';
import { productService, type ProductService } from 'api/services/ProductService';
import { createContext, useContext } from 'react';

interface ContextType {
  client: Client;
  customerService: CustomerService;
  productService: ProductService;
  cartService: CartService;
}

export const dataContext = { client, customerService, productService, cartService };
export type DataContext = typeof dataContext;

export const ApiContext = createContext<ContextType | null>(null);

function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('ApiContext not Provided!');
  }
  return context;
}

export default useApiContext;
