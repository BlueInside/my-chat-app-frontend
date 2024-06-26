import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled.nav`
  background: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;

  @media (max-width: 720px) {
    margin-bottom: 10px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  gap: 20px;
  flex: 1;
  justify-content: flex-end;
  list-style: none;
`;
const Logo = styled.img`
  height: 40px;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <Logo
        src="https://res.cloudinary.com/dhjzutfu9/image/upload/v1716908636/icon_s9qjtp.webp"
        alt="logo"
      />
      <StyledUl>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </StyledUl>
    </StyledNavbar>
  );
}

export default Navbar;
