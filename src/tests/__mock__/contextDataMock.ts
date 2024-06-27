// import { createContext, useContext } from 'react';
import ClientMock from './clientMock';
import CustomerServiceMock from './CustomerServiceMock';
import ProductServiceMock from './ProductServiceMock';
import CartServiceMock from './CartServiceMock';

const dataContextMock = {
  client: new ClientMock(),
  customerService: new CustomerServiceMock(),
  productService: new ProductServiceMock(),
  cartService: new CartServiceMock(),
};

// export type DataContextMock = typeof dataContextMock;

// export const ApiContext = createContext<DataContextMock | null>(null);

// function useApiContext() {
//   const context = useContext(ApiContext);
//   if (!context) {
//     throw new Error('ApiContext not Provided!');
//   }
//   return context;
// }

// export default useApiContext;

export default dataContextMock;
