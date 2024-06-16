import classes from './Pagination.module.scss';

interface PaginationProps {
  productsPerPage: number;
  length: number;
  paginationHandler: (page: number) => void;
  currentPage: number;
}

function Pagination({ productsPerPage, length, paginationHandler, currentPage }: PaginationProps) {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i += 1) {
    paginationNumbers.push(i);
  }

  return (
    <div className={classes.pagination}>
      {paginationNumbers.map((page) => (
        <button
          className={`${classes.pagination__button} ${currentPage === page ? classes.pagination__button_active : ''}`}
          type="button"
          key={page}
          onClick={() => paginationHandler(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
