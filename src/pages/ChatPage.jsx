import { useLoaderData } from 'react-router-dom';
import ConversationsList from '../components/ConversationsList';
import SearchBar from '../components/SearchBar';

function ChatPage() {
  const conversations = useLoaderData();
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
