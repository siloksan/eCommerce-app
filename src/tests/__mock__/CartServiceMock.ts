import { Cart } from '@commercetools/platform-sdk';
import { CartService } from 'api/services/CartService';

class CartServiceMock extends CartService {
  getCart(): Promise<false | void | Cart> {
    return new Promise<Cart>((resolve) => {
      resolve({
        id: 'dcd2f1c6-b81f-4feb-ab71-0653abf797ec',
        version: 1,
        createdAt: '2024-06-24T07:09:28.556Z',
        lastModifiedAt: '2024-06-24T07:09:28.556Z',
        lastModifiedBy: {
          clientId: 'tGfuEWAKnzRNvc6aUsHmQfJl',
          customer: {
            typeId: 'customer',
            id: '3bb050e3-e717-493e-ab11-2b67b2959a9f',
          },
        },
        createdBy: {
          clientId: 'tGfuEWAKnzRNvc6aUsHmQfJl',
          customer: {
            typeId: 'customer',
            id: '3bb050e3-e717-493e-ab11-2b67b2959a9f',
          },
        },
        customerId: '3bb050e3-e717-493e-ab11-2b67b2959a9f',
        lineItems: [],
        cartState: 'Active',
        totalPrice: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 0,
          fractionDigits: 2,
        },
        shippingMode: 'Single',
        shipping: [],
        customLineItems: [],
        discountCodes: [],
        directDiscounts: [],
        inventoryMode: 'None',
        taxMode: 'Platform',
        taxRoundingMode: 'HalfEven',
        taxCalculationMode: 'LineItemLevel',
        deleteDaysAfterLastModification: 90,
        refusedGifts: [],
        origin: 'Customer',
        itemShippingAddresses: [],
      });
    });
  }

  addToCart(id: string): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve(id);
    });
  }

  removeFromCart(id: string): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve(id);
    });
  }
}

export default CartServiceMock;
