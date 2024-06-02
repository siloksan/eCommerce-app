import ProductList from 'components/ProductList/ProductList';

import classes from './Catalog.module.scss';

function Catalog() {
  return (
    <>
      <h2 className={classes.heading}>Catalog</h2>
      <div>
        <div>Filters container</div>
        <div>* Filter</div>
      </div>
      <div>Search bar</div>
      <ProductList />
    </>
  );
}

export default Catalog;
