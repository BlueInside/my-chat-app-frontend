import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNavbar = styled.nav`
  background: #fff;
  padding: 0px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function ChatNavbar({ logout }) {
  return (
    <StyledNavbar>
      <Logo src="../../src/assets/images/icon.webp" alt="logo" />
      <StyledUl>
        <li>
          <Link
            onClick={() => {
              logout();
            }}
            to={'/'}
          >
            Logout
          </Link>
        </li>
      </StyledUl>
    </StyledNavbar>
  );
}

export default ChatNavbar;

ChatNavbar.propTypes = {
  logout: PropTypes.func,
};
