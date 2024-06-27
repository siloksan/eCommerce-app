import { render, screen } from '@testing-library/react';

import ProductCard from 'components/ProductCard/ProductCard';
import { CartProvider } from 'context/cart-context';
import { ApiContext, DataContext } from 'context/context';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('ProductCard', () => {
  const productProps = {
    productKey: 'key',
    productName: 'test',
    productId: 'testId',
    currency: 'testCurrency',
    price: 100,
    discountedPrice: 90,
    imgLink: 'img-link',
    description: 'testDescription',
  };
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <ProductCard {...productProps} />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders productCard', () => {
    customRender(dataContextMock);

    const productCard = screen.getByTestId('product-card');

    expect(productCard).toBeInTheDocument();
  });
  it('renders button add to cart', () => {
    customRender(dataContextMock);

    const addToCartBtn = screen.getByRole('button');

    expect(addToCartBtn).toHaveTextContent(/add to cart/i);
  });

  it('renders card description', () => {
    customRender(dataContextMock);

    const label = screen.getByRole('heading', { level: 3 });

    expect(label).toHaveTextContent(productProps.productName);
  });
});
