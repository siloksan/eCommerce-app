import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';

import client from 'api/client/client';
import ProductCard from 'components/ProductCard/ProductCard';

import classes from './ProductList.module.scss';

function ProductList() {
  const [name, setName] = useState<ProductProjection[]>([]);

  useEffect(() => {
    client.apiRoot
      .productProjections()
      .get({
        queryArgs: {
          limit: 6,
        },
      })
      .execute()
      .then((resp) => setName(resp.body.results));
  }, [name]);

  return (
    <div className={classes.products}>
      {name.map((product) => {
        const { masterVariant } = product;
        const img = masterVariant.images ? masterVariant.images[0].url : '';
        const currencyCode = product.masterVariant.prices ? product.masterVariant.prices[0].value.currencyCode : 'EUR';
        const description = product.description ? product.description['en-GB'] : ''; // TODO : make 'en-GB' a constant - default locale;
        const price = product.masterVariant.prices ? product.masterVariant.prices[0].value.centAmount / 100 : 0;

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
