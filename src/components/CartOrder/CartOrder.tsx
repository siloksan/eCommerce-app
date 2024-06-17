import Button from 'shared/Button/Button';

import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { useCartContext } from 'context/cart-context';
import useApiContext from 'context/context';
import Price from 'components/Price/Price';
import styles from './CartOrder.module.scss';

interface Props {
  totalPrice: CentPrecisionMoney;
  productsCount: number;
  totalPriceWithoutDiscount: number;
}

function CartOrder({ totalPrice, productsCount, totalPriceWithoutDiscount }: Props) {
  const { centAmount, currencyCode } = totalPrice;
  const price = centAmount / 100;

  const { setCartState } = useCartContext();
  const { cartService } = useApiContext();

  function clearShoppingCart() {
    cartService.removeAllGoods().then(() => {
      cartService.getCart().then((cart) => {
        if (cart) setCartState(cart);
      });
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.order_btn}>
        <Button label="Go to checkout" />
      </div>
      <p className={styles.info}>Available delivery methods and times can be selected when placing an order</p>
      <div className={styles.body}>
        <h2>Your shopping cart:</h2>
        <div className={styles.order_info}>
          <div>
            Products <span>({productsCount}):</span>
          </div>
          <div>
            <Price price={totalPriceWithoutDiscount} currency={currencyCode} discountedPrice={price} />
          </div>
        </div>
      </div>
      <div className={styles.remove_btn}>
        <Button label="Clear the basket" handleClick={() => clearShoppingCart()} />
      </div>
    </div>
  );
}

export default CartOrder;
