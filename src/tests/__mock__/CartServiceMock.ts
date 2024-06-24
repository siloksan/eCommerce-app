// import { Cart } from '@commercetools/platform-sdk';
// import { CartService } from 'api/services/CartService';

// class CartServiceMock extends CartService {
//   getCart(): Promise<false | void | Cart> {
//     return new Promise<Cart>((resolve) => {
//       setTimeout(() => {
//         resolve({
//           id: 'test',
//           version: 1,
//           lineItems: [],
//           taxMode: 'Platform',
//           taxCalculationMode: 'LineItemLevel',
//           shippingMode: 'Unrestricted',
//           customLineItems: [],
//           discountCodes: [],
//           discountedPrice: { centAmount: 0 },
//           discountedPriceMode: 'LineItem',
//           totalPrice: { type: 'centPrecision', centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 },
//           taxRoundingMode: 'HalfEven',
//           inventoryMode: 'None',
//           cartState: 'Active',
//           shipping: [
//             {
//               shippingKey: 'test',
//               shippingInfo: {
//                 shippingMethodName: 'test',
//                 price: { type: 'centPrecision', centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 },
//                 shippingRate: {
//                   price: { type: 'centPrecision', centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 },
//                   tiers: [],
//                 },
//                 shippingMethodState: 'Pending',
//               },
//             },
//           ],
//         });
//       }, 1000);
//     }); // 1 second
//   }
// }

// export default CartServiceMock;
