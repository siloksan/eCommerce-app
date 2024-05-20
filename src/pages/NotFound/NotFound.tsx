import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <h2>Oops! The page was Not Found</h2>
      <Link to="/">Go to the main page</Link>
    </>
  );
}

export default NotFoundPage;
