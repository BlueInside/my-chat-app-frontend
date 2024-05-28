import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ErrorDetails = styled.p`
  font-size: 1em;
  color: #888;
  margin-bottom: 20px;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorElement = () => {
  const error = useRouteError();

  return (
    <Container>
      <Title>Something went wrong.</Title>
      <Message>Sorry, an unexpected error has occurred.</Message>
      <ErrorDetails>
        <i>{error.statusText || error.message}</i>
      </ErrorDetails>
      <HomeLink to="/">Go to Home</HomeLink>
    </Container>
  );
};

export default ErrorElement;
