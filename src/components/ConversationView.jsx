import { useFetcher, useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ChatArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%; /* Full height */
  background-color: #f9f9f9; /* Light grey background */
`;

const MessagesWindow = styled.ul`
  flex-grow: 1;
  overflow-y: auto; /* Allows scrolling */
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column-reverse; /* Newest messages at the bottom */
`;

const MessageItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff; /* White background */
  border-top: 1px solid #eee; /* Light border for separation */
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
export default function ConversationView() {
  const fetcher = useFetcher();
  const conversation = useLoaderData();
  const { user } = useAuth();
  const [messages, setMessages] = useState(conversation.messages || []);
  console.log(conversation.messages);
  console.log(conversation);
  const receiverId = conversation?.participants.filter(
    (p) => p._id !== user._id
  );

  useEffect(() => {
    if (fetcher.data && fetcher.data.data && fetcher.data.data.id) {
      setMessages((prev) => [...prev, fetcher.data.data]);
    }
  }, [fetcher.data]);

  return (
    <ChatArea>
      <MessagesWindow>
        {messages.length > 0 ? (
          messages.map((m) => <MessageItem key={m.id}>{m.text}</MessageItem>)
        ) : (
          <MessageItem>
            So empty, don&apos;t be shy and send a first message.
          </MessageItem>
        )}
      </MessagesWindow>
      <InputContainer>
        <fetcher.Form
          method="post"
          action="/messages"
          style={{ display: 'flex', flex: '1' }}
        >
          <input type="hidden" name="receiverId" value={receiverId} />
          <MessageInput
            type="text"
            name="text"
            id="message"
            aria-label="Type your message"
            placeholder="Type a message"
            required
          />
          <SendButton type="submit">Send</SendButton>
        </fetcher.Form>
      </InputContainer>
    </ChatArea>
  );
}
