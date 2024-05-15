import styled from 'styled-components';
import ConversationsList from '../components/ConversationsList';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { conversationLoader } from '../api/conversation';
import { Outlet } from 'react-router-dom';

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 95vh;
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
  overflow-y: auto; /* Makes the chat area scrollable */
`;

function ChatPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    conversationLoader().then((data) => {
      setConversations(data);
    });
  }, []);

  return (
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
  );
}

export default ChatPage;
