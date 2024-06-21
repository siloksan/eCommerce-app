import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Button from 'shared/Button/Button';

describe('Button', () => {
  const buttonLabel = 'click me';
  it('renders button label', () => {
    render(<Button label={buttonLabel} />);
    const buttonElement = screen.getByTestId('button').textContent;
    expect(buttonElement).toMatch(buttonLabel);
  });
  it('should emit click event', () => {
    const handleClick = vi.fn();
    render(<Button label={buttonLabel} handleClick={handleClick} />);
    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
