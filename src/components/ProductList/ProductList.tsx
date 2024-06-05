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
        let discountedPrice;
        if (product.masterVariant.prices && product.masterVariant.prices.length > 0) {
          currencyCode = product.masterVariant.prices[0].value.currencyCode;
          price = product.masterVariant.prices[0].value.centAmount / 100;
          if (product.masterVariant.prices[0].discounted) {
            discountedPrice = product.masterVariant.prices[0].discounted.value.centAmount / 100;
          }
        }

        const description = product.description ? product.description['en-GB'] : ''; // TODO : make 'en-GB' a constant - default locale;
        const productKey = product.key ?? '';

        return (
          <ProductCard
            productKey={productKey}
            productName={product.name['en-GB']}
            currency={currencyCode}
            price={price}
            imgLink={img}
            description={description}
            discountedPrice={discountedPrice}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
