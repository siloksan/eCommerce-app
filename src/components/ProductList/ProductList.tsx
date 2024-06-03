import { ProductProjection } from '@commercetools/platform-sdk';

import ProductCard from 'components/ProductCard/ProductCard';

import classes from './ProductList.module.scss';

interface ProductListProps {
  products: ProductProjection[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className={classes.products}>
      {products.map((product) => {
        const { masterVariant } = product;
        const img = masterVariant.images ? masterVariant.images[0].url : '';

        let currencyCode = 'EUR';
        let price = 0;
        if (product.masterVariant.prices) {
          currencyCode =
            product.masterVariant.prices.length > 0 ? product.masterVariant.prices[0].value.currencyCode : 'EUR';
          price = product.masterVariant.prices.length > 0 ? product.masterVariant.prices[0].value.centAmount / 100 : 0;
        }

        const description = product.description ? product.description['en-GB'] : ''; // TODO : make 'en-GB' a constant - default locale;

        return (
          <ProductCard
            key={product.id}
            productName={product.name['en-GB']}
            currency={currencyCode}
            price={price}
            imgLink={img}
            description={description}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
