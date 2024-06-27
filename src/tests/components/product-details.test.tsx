import { render, screen } from '@testing-library/react';
import ProductDetails from 'components/ProductDetails/ProductDetails';

import { CartProvider } from 'context/cart-context';
import { ApiContext, DataContext } from 'context/context';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('ProductDetails', () => {
  const productProps = {
    name: 'test-name',
    prices: [
      { price: '50', currencyCode: 'USD' },
      { price: '46', currencyCode: 'USD' },
    ],
    description: 'test-description',
    id: 'test-id',
  };
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <ProductDetails {...productProps} />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders ProductDetails', () => {
    customRender(dataContextMock);

    const rootElement = screen.getByTestId('product-details');

    expect(rootElement).toBeInTheDocument();
  });

  it('renders product name', () => {
    customRender(dataContextMock);

    const productName = screen.getByRole('heading', { level: 1 });

    expect(productName).toHaveTextContent(productProps.name);
  });

  it('renders product description', () => {
    customRender(dataContextMock);

    const paragraph = screen.getByRole('paragraph');

    expect(paragraph).toHaveTextContent(productProps.description);
  });
});
