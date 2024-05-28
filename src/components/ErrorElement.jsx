import { Link, useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorElement;
