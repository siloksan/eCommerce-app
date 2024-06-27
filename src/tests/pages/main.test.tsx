import { render, screen } from '@testing-library/react';

import { ApiContext, DataContext } from 'context/context';
import Main from 'pages/Main/Main';
import { BrowserRouter } from 'react-router-dom';
import dataContextMock from 'tests/__mock__/contextDataMock';

describe('Main page', () => {
  const customRender = (value: DataContext) => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <Main />
        </ApiContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders links', () => {
    customRender(dataContextMock);

    const links = screen.getByTestId('links');

    expect(links).toBeInTheDocument();
  });

  it('renders link to user profile', () => {
    dataContextMock.customerService.userAuthorized = true;
    customRender(dataContextMock);

    const links = screen.getAllByRole('link');
    const link = links.filter((item) => item.textContent === 'User Profile Page');

    expect(link.length).toBe(1);
  });
});
