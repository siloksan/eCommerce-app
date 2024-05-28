import Client from 'api/client/client';
import CustomerService from 'api/services/CustomerService';
import { createContext, useContext } from 'react';

interface ContextType {
  client: Client;
  customerService: CustomerService;
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
