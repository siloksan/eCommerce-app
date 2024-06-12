import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import useApiContext from 'context/context';
import CustomLoader from 'shared/Loader/loader';

import Button from 'shared/Button/Button';
import ProductBasket from 'components/ProductBasket/ProductBasket';

import CartOrder from 'components/CartOrder/CartOrder';
import styles from './Cart.module.scss';

function CartPage() {
  const { cartService } = useApiContext();

  const [cart, setCart] = useState<Cart | null>(null);

  // function createCart() {
  //   cartService.createCart();
  // }

  // function checkCart() {
  //   cartService.checkIfCartExist();
  // }

  function updateCart() {
    cartService.updateCart('3bc2d258-bbd6-4bea-bda4-d024197f4ada');
  }

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

  const { lineItems: products } = cart;

  const productList = products.map((product) => {
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
          <CartOrder />
        </section>
      </div>

      {/* <Button label="Create cart" handleClick={() => createCart()} />
      <Button label="Check cart" handleClick={() => checkCart()} /> */}
      <Button label="Update cart" handleClick={() => updateCart()} />
      {/* <Button label="Get cart" handleClick={() => getCart()} /> */}
    </div>
  );
}

export default CartPage;
