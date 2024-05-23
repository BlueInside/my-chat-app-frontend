import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/AuthContext';

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
  gap: 40px;
  flex: 1;
  justify-content: flex-end;
  list-style: none;
`;
const Logo = styled.img`
  height: 40px;
`;

function ChatNavbar({ logout }) {
  const { user } = useAuth();
  return (
    <StyledNavbar>
      <Logo src="../../src/assets/images/icon.webp" alt="logo" />
      <StyledUl>
        <li>
          <Link to={`profile/${user.id}`}>Profile</Link>
        </li>

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
