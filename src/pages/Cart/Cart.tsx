import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import useApiContext from 'context/context';
import CustomLoader from 'shared/Loader/loader';

import ProductBasket from 'components/ProductBasket/ProductBasket';

import CartOrder from 'components/CartOrder/CartOrder';
import styles from './Cart.module.scss';

function CartPage() {
  const { cartService } = useApiContext();

  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    cartService.getCart().then((res) => {
      if (res) setCart(res);
    });
  }, [cartService]);

  if (!cart) {
    return (
      <div>
        <CustomLoader />
      </div>
    );
  }

  const { lineItems: products, totalPrice } = cart;
  let productsCount = 0;

  const productList = products.map((product) => {
    productsCount += product.quantity;
    return <ProductBasket product={product} key={product.id} />;
  });

  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Your goods</h2>
          <ul className={styles.list}>{productList}</ul>
        </section>
        <section className={styles.section}>
          <CartOrder totalPrice={totalPrice} productsCount={productsCount} />
        </section>
      </div>
    </div>
  );
}

export default CartPage;
