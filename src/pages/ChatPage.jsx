import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ConversationsList from '../components/ConversationsList';
import { conversationLoader } from '../api/conversation';
import { Outlet } from 'react-router-dom';
import ChatNavbar from '../components/ChatNavbar';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 90vh;

  @media (max-width: 728px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto;
  position: relative;

  @media (max-width: 728px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: #fff;
    transform: ${(props) =>
      props.open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const Hamburger = styled.div`
  display: none;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1001;

  @media (max-width: 728px) {
    display: flex;
  }

  div {
    width: 100%;
    height: 4px;
    background: #000;
    transition: all 0.3s linear;
  }
`;

const ChatArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 90%;
  background-color: #f9f9f957;

  @media (max-width: 728px) {
    margin-top: 60px;
    padding: 5px;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;

  @media (max-width: 728px) {
    display: flex;
  }
`;

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const loadConversations = () => {
      conversationLoader().then((data) => {
        setConversations(data);
      });
    };

    loadConversations();

    const handleNewMessage = () => {
      loadConversations(); // Reload conversations when a message is sent
    };

    window.addEventListener('messageSent', handleNewMessage);

    return () => {
      window.removeEventListener('messageSent', handleNewMessage);
    };
  }, []);

  return (
    <>
      <ChatNavbar logout={logout} />
      <ChatContainer>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </Hamburger>
        <Sidebar open={menuOpen}>
          <SearchBar
            setConversations={setConversations}
            conversations={conversations}
          />
          <ConversationsList conversations={conversations} />
          <MobileMenu>
            <Link to={`profile/${user.id}`}>
              <FontAwesomeIcon icon={faUser} />
              Profile
            </Link>
            <Link
              onClick={() => {
                logout();
              }}
              to={'/'}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </MobileMenu>
        </Sidebar>
        <ChatArea>
          <Outlet />
        </ChatArea>
      </ChatContainer>
    </>
  );
}

export default ChatPage;
