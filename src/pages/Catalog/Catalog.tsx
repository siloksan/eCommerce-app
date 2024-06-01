import ProductCard from 'components/ProductCard/ProductCard';

import { ProductCardProps } from 'types/interfaces';

const cardInfo: ProductCardProps = {
  id: '123',
  productName: 'Product',
  currency: 'USD',
  price: 1000,
  previousPrice: 1100,
};

function Catalog() {
  return (
    <>
      <h2>Catalog</h2>
      <div>
        <div>Filters container</div>
        <div>* Filter</div>
      </div>
      <div>Search bar</div>
      <div>
        Catalog list
        <ProductCard {...cardInfo} />
      </div>
      <div>Pagination 1, 2, 3, .... </div>
    </>
  );
}

export default Catalog;
