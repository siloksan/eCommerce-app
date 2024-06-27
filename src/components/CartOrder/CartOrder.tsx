import Button from 'shared/Button/Button';

import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import { useCartContext } from 'context/cart-context';
import useApiContext from 'context/context';
import Price from 'components/Price/Price';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
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
  const { cartService, client } = useApiContext();
  const [promo, setPromo] = useState('');

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setPromo(e.target.value);
  }

  function applyPromoCode(code: string) {
    if (client.storageController.getItem('promo')) {
      toast.error("You've already activated your promo code!");
      return;
    }
    cartService.addDiscountCode(code).then((res) => {
      if (res === true) {
        cartService.getCart().then((cart) => {
          if (cart) setCartState(cart);
        });
        client.storageController.setItem('promo', code);
        toast.success('The promo code is active!');
      } else {
        toast.error('Incorrect promo code!');
      }
    });
  }

  function clearShoppingCart() {
    cartService.removeAllGoods().then(() => {
      cartService.getCart().then((cart) => {
        if (cart) setCartState(cart);
      });
    });
  }

  return (
    <div className={styles.container} data-testid="cart-order">
      <div className={styles.order_btn}>
        <Button label="Go to checkout" />
      </div>
      <label htmlFor="promo">
        Please enter your promo code:
        <input value={promo} type="text" className={styles.input} id="promo" onChange={(e) => handleInput(e)} />
      </label>
      <Button label="Apply Promo" handleClick={() => applyPromoCode(promo)} />
      <p className={styles.info}>Available delivery methods and times can be selected when placing an order</p>
      <div className={styles.body}>
        <h2>Your shopping cart:</h2>
        <div className={styles.order_info}>
          <div>
            Products <span data-testid="products-count">({productsCount}):</span>
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
