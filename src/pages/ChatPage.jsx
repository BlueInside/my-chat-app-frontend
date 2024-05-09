import SearchBar from '../components/SearchBar';
const conversation = {
  lastMessage: 'hello',
  participants: ['Karol pulawski'],
  messages: [{ id: 1 }],
};
function ChatPage() {
  return (
    <>
      <div>
        <SearchBar />
      </div>

      <ul>
        <li>
          <div>
            <p>{conversation.participants[0]}</p>
            <p>{conversation.lastMessage[0]}</p>
          </div>
        </li>
      </ul>
    </>
  );
}

export default ChatPage;
