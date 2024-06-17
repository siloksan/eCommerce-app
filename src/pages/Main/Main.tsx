import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useCartContext } from 'context/cart-context';
import useApiContext from 'context/context';
import { Link } from 'react-router-dom';
import Button from 'shared/Button/Button';

import styles from './Main.module.scss';

function Main() {
  const { customerService, client } = useApiContext();
  const { setCartState } = useCartContext();
  const { cartService } = useApiContext();
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

  return (
    <>
      <h2>Links and routes to the pages:</h2>
      <ul>
        <li>
          <Link to="/login">Login Page</Link> - /login
        </li>
        <li>
          <Link to="/register">Registration Page</Link> - /register
        </li>
        {customerService.userAuthorized && (
          <li>
            <Link to="/user-profile">User Profile Page</Link> - /user-profile
          </li>
        )}
        <li>
          <Link to="product/lavazza-crema-aroma">Product</Link> - /product/:productKey
        </li>
        <li>
          <Link to="catalog">Catalog</Link> - /catalog
        </li>
      </ul>
      <section className={styles.promo}>
        <h2>Great deals</h2>
        <p className={styles.description}>
          Make a first purchase and enjoy an amazing <span>25%</span> discount on your entire cart, just for your first
          order!
        </p>
        <div className={styles.promo_code}>
          Your promo code: <span>first-purchase-awesome</span>
        </div>
        <label htmlFor="promo">
          Please enter your promo code:
          <input value={promo} type="text" className={styles.input} id="promo" onChange={(e) => handleInput(e)} />
        </label>
        <Button label="Apply Promo" handleClick={() => applyPromoCode(promo)} />
      </section>
    </>
  );
}

export default Main;
