import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledHeader = styled.header`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

function Header() {
  return (
    <StyledHeader>
      <Title>Chat Without Boundaries</Title>
      <div>
        <Link to={'/login'}>
          <button>Login</button>
        </Link>

        <Link to={'/register'}>
          <button>register</button>
        </Link>
      </div>
    </StyledHeader>
  );
}

export default Header;
