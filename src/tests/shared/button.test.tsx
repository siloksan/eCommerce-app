import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Button from 'shared/Button/Button';

describe('Button', () => {
  it('Render button label', () => {
    render(<Button label="button" />);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
  });
});
