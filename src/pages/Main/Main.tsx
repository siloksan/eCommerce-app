import { Link } from 'react-router-dom';

function Main() {
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
        <li>
          <Link to="/user-profile">User Profile Page</Link> - /user-profile
        </li>
        <li>
          <Link to="product/lavazza-crema-aroma">Product</Link> - /product/:productKey
        </li>
        <li>
          <Link to="catalog">Catalog</Link> - /catalog
        </li>
      </ul>
    </>
  );
}

export default Main;
