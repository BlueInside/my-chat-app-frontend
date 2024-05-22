import styled from 'styled-components';
import ConversationsList from '../components/ConversationsList';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { conversationLoader } from '../api/conversation';
import { Outlet } from 'react-router-dom';
import ChatNavbar from '../components/ChatNavbar';
import { useAuth } from '../utils/AuthContext';

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 90vh;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc; /* Adds a subtle separator */
  padding: 20px; /* Padding around the content in the sidebar */
  overflow-y: auto; /* Makes the sidebar scrollable */
`;

const ChatArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 90%;
  background-color: #f9f9f957;
`;

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const { logout } = useAuth();

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
        <Sidebar>
          <SearchBar
            setConversations={setConversations}
            conversations={conversations}
          />
          <ConversationsList conversations={conversations} />
        </Sidebar>
        <ChatArea>
          <Outlet />
        </ChatArea>
      </ChatContainer>
    </>
  );
}

export default ChatPage;
