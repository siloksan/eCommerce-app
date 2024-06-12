import Button from 'shared/Button/Button';

import currencyCodeToSymbol from 'utils/helpers/currencyCodeToSymbol';
import { CentPrecisionMoney } from '@commercetools/platform-sdk';
import styles from './CartOrder.module.scss';

interface Props {
  totalPrice: CentPrecisionMoney;
  productsCount: number;
}

function CartOrder({ totalPrice, productsCount }: Props) {
  const { centAmount, currencyCode } = totalPrice;
  const currencySymbol = currencyCodeToSymbol(currencyCode);
  const price = centAmount / 100;

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
            Products <span>({productsCount})</span>
          </div>
          <div>
            {price} <span>{currencySymbol}</span>
          </div>
        </div>
      </div>
      <div className={styles.remove_btn}>
        <Button label="Clear the basket" />
      </div>
    </div>
  );
}

export default CartOrder;
