import { useEffect } from 'react';
import CustomLoader from 'shared/Loader/loader';

import ProductBasket from 'components/ProductBasket/ProductBasket';

import CartOrder from 'components/CartOrder/CartOrder';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCartContext } from 'context/cart-context';
import styles from './Cart.module.scss';

function CartPage() {
  const { cart } = useCartContext();

  useEffect(() => {
    if (cart && cart.lineItems.length === 0) {
      toast.success('The shopping cart is empty');
    }
  }, [cart]);

  if (!cart) {
    return (
      <div>
        <CustomLoader />
      </div>
    );
  }

  const { lineItems: products, totalPrice } = cart;
  let productsCount = 0;
  let totalPriceWithoutDiscount = 0;

  const productList = products.map((product) => {
    totalPriceWithoutDiscount += (product.price.value.centAmount * product.quantity) / 100;
    productsCount += product.quantity;
    return <ProductBasket product={product} key={product.id} />;
  });

  if (productsCount === 0) {
    return (
      <div className={styles.container}>
        Check out our <Link to="/catalog">catalog</Link> to discover the best coffee you have ever tasted.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Your goods</h2>
          <ul className={styles.list}>{productList}</ul>
        </section>
        <section className={styles.section}>
          <CartOrder
            totalPrice={totalPrice}
            productsCount={productsCount}
            totalPriceWithoutDiscount={totalPriceWithoutDiscount}
          />
        </section>
      </div>
    </div>
  );
}

export default CartPage;
