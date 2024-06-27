import { fireEvent, render, screen } from '@testing-library/react';

import Button from 'shared/Button/Button';
import styles from 'shared/Button/Button.module.scss';

describe('Button', () => {
  const buttonLabel = 'click me';
  it('renders button label', () => {
    render(<Button label={buttonLabel} />);
    const buttonElement = screen.getByTestId('button').textContent;
    expect(buttonElement).toMatch(buttonLabel);
  });
  it("shouldn't have additional class if accent is false ", () => {
    render(<Button label={buttonLabel} accent={false} />);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).not.toHaveClass(styles.buttonAccent);
  });
  it('should emit click event', () => {
    const handleClick = vi.fn();
    render(<Button label={buttonLabel} handleClick={handleClick} />);
    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
