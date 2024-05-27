import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <h2>Links and routes to the pages:</h2>
      <ul>
        <li>
          <Link to="login">Login Page</Link> - /login
        </li>
        <li>
          <Link to="register">Registration Page</Link> - /register
        </li>
      </ul>
    </>
  );
}

export default Main;
