import { render, screen } from '@testing-library/react';
import { CartProvider } from 'context/cart-context';

import { ApiContext, DataContext } from 'context/context';
import Login from 'pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('Login page', () => {
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <Login />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders title', () => {
    customRender(dataContextMock);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('renders input e-mail', () => {
    customRender(dataContextMock);

    const email = screen.getByLabelText('Email');

    expect(email).toBeInTheDocument();
  });

  it('renders input password', () => {
    customRender(dataContextMock);

    const password = screen.getByLabelText('Password');

    expect(password).toBeInTheDocument();
  });

  it('renders submit button', () => {
    customRender(dataContextMock);

    const submit = screen.getByRole('button', { name: 'Login' });

    expect(submit).toBeInTheDocument();
  });
});
