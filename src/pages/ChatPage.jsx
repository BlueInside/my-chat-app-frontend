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
  }, [conversations]);

  return (
    <>
      <div>
        <SearchBar
          setConversations={setConversations}
          conversations={conversations}
        />
        <ConversationsList conversations={conversations} />
      </div>
    </>
  );
}

export default ChatPage;
