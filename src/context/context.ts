import { type Client } from 'api/client/client';
import { type CustomerService } from 'api/services/CustomerService';
import { type ProductService } from 'api/services/ProductService';
import { createContext, useContext } from 'react';

interface ContextType {
  client: Client;
  customerService: CustomerService;
  productService: ProductService;
}

export const ApiContext = createContext<ContextType | null>(null);

function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('ApiContext not Provided!');
  }
  return context;
}

export default useApiContext;