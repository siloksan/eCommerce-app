import { render, screen } from '@testing-library/react';

import Header from 'components/Header/Header';
import { CartProvider } from 'context/cart-context';
import { ApiContext, DataContext } from 'context/context';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('Header', () => {
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <Header />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders Header', () => {
    customRender(dataContextMock);

    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });
});
