import ProductCard from 'components/ProductCard/ProductCard';

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
        <ProductCard />
      </div>
      <div>Pagination 1, 2, 3, .... </div>
    </>
  );
}

export default Catalog;
