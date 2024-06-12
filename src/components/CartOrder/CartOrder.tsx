import Button from 'shared/Button/Button';

import styles from './CartOrder.module.scss';

function CartOrder() {
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
            Products <span>(0)</span>
          </div>
          <div>
            1223 <span>EUR</span>
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
