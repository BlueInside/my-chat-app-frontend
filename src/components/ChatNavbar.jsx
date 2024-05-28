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

  @media (max-width: 728px) {
    display: none;
  }
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
      <Link to={'/'}>
        <Logo
          src="https://res.cloudinary.com/dhjzutfu9/image/upload/v1716908636/icon_s9qjtp.webp"
          alt="logo"
        />
      </Link>
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
