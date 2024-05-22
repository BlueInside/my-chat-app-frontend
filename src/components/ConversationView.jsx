import { useFetcher, useLoaderData, useOutletContext } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useEffect, useRef, useState } from 'react';
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
  align-self: ${(props) => (props.$isSender ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.$isSender ? '#DCF8C6' : '#EAEAEA')};
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

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d3d3d3;
  background-color: #f0f0f0;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`;
export default function ConversationView() {
  const fetcher = useFetcher();
  const conversation = useLoaderData();
  const [updateConversations] = useOutletContext();
  const { user } = useAuth();
  const [messages, setMessages] = useState(conversation.messages || []);
  const receiver = conversation?.participants.find((p) => p._id !== user.id);

  const updateConversationsRef = useRef(updateConversations);

  useEffect(() => {
    if (conversation.messages) {
      setMessages(conversation.messages);
    } else {
      setMessages([]);
    }
  }, [conversation]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.data && fetcher.data.data._id) {
      setMessages((prev) => [fetcher.data.data, ...prev]);
      updateConversationsRef.current();
    }
  }, [fetcher.data]);

  return (
    <ChatArea>
      <UserInfoContainer id="receiver-info">
        <Avatar
          src={receiver.avatar || '../../src/assets/images/defaultAvatar.webp'}
          alt={`${receiver.username}'s avatar`}
        />
        <h2>{receiver.username}</h2>
      </UserInfoContainer>
      <MessagesWindow>
        {messages.length > 0 ? (
          messages.map((m) => (
            <MessageItem key={m._id} $isSender={m.sender === user.id}>
              {m.text}
            </MessageItem>
          ))
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
          <input type="hidden" name="receiverId" value={receiver._id} />
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
