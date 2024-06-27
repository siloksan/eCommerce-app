import { Link } from 'react-router-dom';

import useApiContext from 'context/context';
import styles from './Main.module.scss';

function Main() {
  const { customerService } = useApiContext();

  return (
    <>
      <h2>Links and routes to the pages:</h2>
      <ul data-testid="links">
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
      </section>
    </>
  );
}

export default Main;
