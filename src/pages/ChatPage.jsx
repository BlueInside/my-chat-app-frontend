import ConversationsList from '../components/ConversationsList';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { conversationLoader } from '../api/conversation';

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    conversationLoader().then((data) => {
      setConversations(data);
    });
  }, []);

  return (
    <>
      <div>
        <SearchBar />
        <ConversationsList conversations={conversations} />
      </div>
    </>
  );
}

export default ChatPage;
