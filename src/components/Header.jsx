import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutLink = styled.a`
  color: #007bff;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.p`
  margin: 10px 0;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 20px;
`;

function Header() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <HeaderContainer>
        <Title>Welcome back, {user.username}!</Title>
        <UserInfo>Ready to jump back into the conversation?</UserInfo>
        <Link to={'/chat'}>
          <Button>Enter Chat</Button>
        </Link>
        <UserInfo>
          It&apos;s not you?
          <LogoutLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </LogoutLink>
        </UserInfo>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <Title>Chat Without Boundaries</Title>
      <Subtitle>Connect instantly with people all over the world.</Subtitle>
      <Subtitle>
        Join today and start experiencing real-time communication with ease.
      </Subtitle>
      <div>
        <Link to={'/login'}>
          <Button>Login</Button>
        </Link>
        <Link to={'/register'}>
          <Button>Register</Button>
        </Link>
      </div>
    </HeaderContainer>
  );
}

export default Header;
