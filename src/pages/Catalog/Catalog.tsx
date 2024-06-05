import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';

import { client } from 'api/client/client';
import ProductList from 'components/ProductList/ProductList';
import Pagination from 'components/Pagination/Pagination';
import Search from 'components/Search/Search';

import classes from './Catalog.module.scss';

function Catalog() {
  const PRODUCTS_PER_PAGE = 6;
  const INIT_PAGE = 1;

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [length, setLength] = useState(PRODUCTS_PER_PAGE);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    client.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: PRODUCTS_PER_PAGE,
          offset: PRODUCTS_PER_PAGE * (currentPage - 1),
          'text.en-GB': searchInput,
          fuzzy: true,
        },
      })
      .execute()
      .then((resp) => {
        if (resp.body.total) setLength(resp.body.total);
        setProducts(resp.body.results);
      });
  }, [products, currentPage, searchInput]);

  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const el = e.target as HTMLInputElement;
    setSearchInput(el.value.toLowerCase());
  };

  return (
    <>
      <h2 className={classes.heading}>Catalog</h2>
      <div>
        {/* <div>Filters container</div> */}
        {/* <div>* Filter</div> */}
      </div>
      <Search searchHandler={handleSearch} />
      <ProductList products={products} />
      <Pagination
        productsPerPage={PRODUCTS_PER_PAGE}
        length={length}
        paginationHandler={handlePagination}
        currentPage={currentPage}
      />
    </>
  );
}

export default Catalog;
