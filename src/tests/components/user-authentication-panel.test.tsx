import { fireEvent, render, screen } from '@testing-library/react';
import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';

import { CartProvider } from 'context/cart-context';
import { ApiContext, DataContext } from 'context/context';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('UserAuthenticationPanel', () => {
  const mockLogOut = vi.fn();
  const customRender = (value: DataContext, userAuthorized: boolean, logOut: () => void) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <CartProvider>
            <UserAuthenticationPanel {...{ userAuthorized, logOut }} />
          </CartProvider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders UserAuthenticationPanel', () => {
    customRender(dataContextMock, true, mockLogOut);

    const rootTag = screen.getByTestId('user-authentication-panel');

    expect(rootTag).toBeInTheDocument();
  });

  it('renders logoOut button', () => {
    customRender(dataContextMock, true, mockLogOut);

    const logOut = screen.getByRole('button').textContent;
    const links = screen.queryAllByRole('link');

    expect(links.length).toBe(0);
    expect(logOut).toBe('Log out');
  });

  it('renders links', () => {
    customRender(dataContextMock, false, mockLogOut);

    const links = screen.getAllByRole('link');
    const logOut = screen.queryByRole('button');

    expect(logOut).not.toBeInTheDocument();
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('calls logOut function when log out button is clicked', () => {
    customRender(dataContextMock, true, mockLogOut);

    const logOut = screen.getByRole('button');
    fireEvent.click(logOut);

    expect(mockLogOut).toHaveBeenCalled();
  });
});
