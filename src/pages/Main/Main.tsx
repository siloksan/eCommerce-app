import { Link } from 'react-router-dom';

function Main() {
  return (
    <ul>
      <li>
        <Link to="login">Login Page</Link>
      </li>
      <li>
        <Link to="register">Registration Page</Link>
      </li>
    </ul>
  );
}

export default Main;
