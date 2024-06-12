import Button from 'shared/Button/Button';
import Price from 'components/Price/Price';
import { ProductPrice } from 'types/product-interfaces';
import useApiContext from 'context/context';

import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';

interface Props {
  name?: string;
  prices: ProductPrice[];
  description?: string;
  id: string;
}

function ProductDetails({ name = '', prices, description = '', id }: Props) {
  const { price, currencyCode } = prices[0];
  let discountedPrice: string | undefined;
  if (prices[1]) {
    discountedPrice = prices[1].price;
  }
  const { cartService } = useApiContext();
  const [inCart, setInCart] = useState(false);

  function addToShoppingCart(productId: string) {
    cartService.addToCart(productId).then((res) => {
      if (res) setInCart(true);
    });
  }

  function removeFromShoppingCart(productId: string) {
    cartService.removeFromCart(productId).then((res) => {
      if (res) setInCart(false);
    });
  }

  useEffect(() => {
    cartService.getCart().then((cart) => {
      if (cart) {
        cart.lineItems.forEach((product) => {
          if (product.productId === id) setInCart(true);
        });
      }
    });
  }, [cartService, id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.price}>
        <Price currency={currencyCode} price={Number(price)} discountedPrice={Number(discountedPrice)} />
      </div>
      <div>
        <h2>Description:</h2>
        <p className={styles.description}>{description}</p>
      </div>
      {inCart ? (
        <Button label="Remove from cart" handleClick={() => removeFromShoppingCart(id)} />
      ) : (
        <Button label="Add to cart" handleClick={() => addToShoppingCart(id)} />
      )}
    </div>
  );
}

export default ProductDetails;
