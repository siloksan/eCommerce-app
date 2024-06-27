import Button from 'shared/Button/Button';
import Price from 'components/Price/Price';
import { ProductPrice } from 'types/product-interfaces';
import useApiContext from 'context/context';

import { useEffect, useState } from 'react';
import { useCartContext } from 'context/cart-context';
import styles from './ProductDetails.module.scss';

interface Props {
  name?: string;
  prices: ProductPrice[];
  description?: string;
  id: string;
}

function ProductDetails({ name = '', prices, description = '', id: productId }: Props) {
  const { price, currencyCode } = prices[0];
  let discountedPrice: string | undefined;
  if (prices[1]) {
    discountedPrice = prices[1].price;
  }
  const { cartService } = useApiContext();
  const { setCartState, cart } = useCartContext();

  const [inCart, setInCart] = useState(false);

  async function updateCart(id: string, action: 'remove' | 'add') {
    let res: string | number | boolean;
    if (action === 'add') {
      res = await cartService.addToCart(id);
    } else {
      res = await cartService.removeFromCart(id);
    }
    if (res) {
      const newCart = await cartService.getCart();
      if (newCart) {
        setCartState(newCart);
        setInCart(action === 'add');
      }
    }
  }

  async function addToShoppingCart() {
    if (!cart) {
      await cartService.createCart();
    }
    await updateCart(productId, 'add');
  }

  async function removeFromShoppingCart() {
    if (!cart) {
      await cartService.createCart();
    }
    await updateCart(productId, 'remove');
  }

  useEffect(() => {
    if (cart) {
      cart.lineItems.forEach((product) => {
        if (product.productId === productId) setInCart(true);
      });
    }
  }, [cart, productId]);

  return (
    <div className={styles.container} data-testid="product-details">
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.price}>
        <Price currency={currencyCode} price={Number(price)} discountedPrice={Number(discountedPrice)} />
      </div>
      <div>
        <h2>Description:</h2>
        <p className={styles.description}>{description}</p>
      </div>
      {inCart ? (
        <Button label="Remove from cart" handleClick={() => removeFromShoppingCart()} />
      ) : (
        <Button label="Add to cart" handleClick={() => addToShoppingCart()} />
      )}
    </div>
  );
}

export default ProductDetails;
