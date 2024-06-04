import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';

import Client from 'api/client/client';
import ProductList from 'components/ProductList/ProductList';
import Pagination from 'components/Pagination/Pagination';

import classes from './Catalog.module.scss';

function Catalog() {
  const PRODUCTS_PER_PAGE = 6;
  const INIT_PAGE = 1;

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(INIT_PAGE);
  const [length, setLength] = useState(PRODUCTS_PER_PAGE);

  useEffect(() => {
    Client.apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: PRODUCTS_PER_PAGE,
          offset: PRODUCTS_PER_PAGE * (currentPage - 1),
        },
      })
      .execute()
      .then((resp) => {
        if (resp.body.total) setLength(resp.body.total);
        setProducts(resp.body.results);
      });
  }, [products, currentPage]);

  const handlePagination = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
      <h2 className={classes.heading}>Catalog</h2>
      <div>
        {/* <div>Filters container</div> */}
        {/* <div>* Filter</div> */}
      </div>
      {/* <div>Search bar</div> */}
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
