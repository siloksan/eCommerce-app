import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

import classes from './NotFound.module.scss';

function NotFoundPage() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.error__number}>{error.status}</h1>
      <h2>{error.statusText}</h2>
      <p>Oops! Something went wrong :(</p>
      <p>
        But don&apos;t fret! <br /> Let&apos;s start over
        <Link to="/" className={classes.link}>
          To the main page
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
