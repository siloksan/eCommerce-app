import { render, screen } from '@testing-library/react';
import Price from 'components/Price/Price';

describe('Price', () => {
  const priceProps = {
    currency: 'EUR',
    price: 30,
  };

  it('renders Price component', () => {
    render(<Price {...priceProps} />);

    const root = screen.getByTestId('price');

    expect(root).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<Price {...priceProps} />);

    const root = screen.getByTestId('price');

    expect(root).toHaveTextContent(priceProps.price.toString());
  });

  it('renders discounted price', () => {
    const discountedPrice = 20;
    render(<Price {...priceProps} discountedPrice={discountedPrice} />);

    const root = screen.getByTestId('price');

    expect(root).toHaveTextContent(priceProps.price.toString());
    expect(root).toHaveTextContent(discountedPrice.toString());
  });
});
