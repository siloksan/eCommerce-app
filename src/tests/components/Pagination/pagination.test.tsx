import { render, screen, fireEvent } from '@testing-library/react';

import Pagination from 'components/Pagination/Pagination';
import styles from 'components/Pagination/Pagination.module.scss';

describe('Pagination', () => {
  it('renders button pagination', () => {
    const currentPage = 3;
    const handleClick = vi.fn();
    render(<Pagination productsPerPage={6} length={36} paginationHandler={handleClick} currentPage={currentPage} />);
    const paginationButtons = screen.getAllByTestId('pagination-button');
    expect(paginationButtons.length).toBe(6);
    expect(paginationButtons[currentPage - 1]).toHaveTextContent(currentPage.toString());
    expect(paginationButtons[currentPage - 1]).toHaveClass(styles.pagination__button_active);
  });
  it('should emit click event', () => {
    const currentPage = 3;
    const handleClick = vi.fn();
    render(<Pagination productsPerPage={6} length={36} paginationHandler={handleClick} currentPage={currentPage} />);
    const paginationButtons = screen.getAllByTestId('pagination-button');
    fireEvent.click(paginationButtons[currentPage]);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
