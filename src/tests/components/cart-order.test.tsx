import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';

import CartOrder from 'components/CartOrder/CartOrder';
import { CartProvider } from 'context/cart-context';
import { ApiContext, DataContext } from 'context/context';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('CartOrder', () => {
  const totalPrice: CentPrecisionMoney = {
    type: 'centPrecision',
    centAmount: 100,
    currencyCode: 'USD',
    fractionDigits: 2,
  };
  const cartOrderProps = {
    productsCount: 2,
    totalPriceWithoutDiscount: 100,
  };
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <CartOrder
              totalPrice={totalPrice}
              productsCount={cartOrderProps.productsCount}
              totalPriceWithoutDiscount={cartOrderProps.totalPriceWithoutDiscount}
            />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders cartOrder', () => {
    customRender(dataContextMock);

    const cartOrder = screen.getByTestId('cart-order');

    expect(cartOrder).toBeInTheDocument();
  });

  it('renders products count', () => {
    customRender(dataContextMock);

    const productsCount = screen.getByTestId('products-count');

    expect(productsCount).toHaveTextContent(cartOrderProps.productsCount.toString());
  });
});
