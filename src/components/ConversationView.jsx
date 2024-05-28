import { Link, useFetcher, useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ChatArea = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  @media (max-width: 728px) {
    padding: 10px;
  }
`;

const MessagesWindow = styled.ul`
  flex-grow: 1;
  overflow-y: auto; /* Allows scrolling */
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column-reverse; /* Newest messages at the bottom */
  max-height: 60vh; /* Set a maximum height */

  @media (max-width: 728px) {
    max-height: 50vh;
  }
`;

const MessageItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  align-self: ${(props) => (props.$isSender ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.$isSender ? '#daf8cb' : '#f1f0f0')};
  border-radius: 8px;
  border: 1px solid #ccc;

  @media (max-width: 728px) {
    padding: 8px;
    margin: 5px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff; /* White background */
  border-top: 1px solid #eee; /* Light border for separation */

  @media (max-width: 728px) {
    padding: 5px;
  }
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;

  @media (max-width: 728px) {
    padding: 8px;
    margin-right: 5px;
  }
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

  @media (max-width: 728px) {
    padding: 8px 15px;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d3d3d3;
  background-color: #f0f0f0;

  @media (max-width: 728px) {
    width: 30px;
    height: 30px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;

  @media (max-width: 728px) {
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
  display: inline-block;
  color: inherit;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

export default function ConversationView() {
  const fetcher = useFetcher();
  const conversation = useLoaderData();
  const { user } = useAuth();
  const [messages, setMessages] = useState(conversation.messages || []);
  const receiver = conversation?.participants.find((p) => p._id !== user.id);
  const formRef = useRef(null);

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
      formRef.current.reset();
    }
  }, [fetcher.data]);

  return (
    <ChatArea>
      <StyledLink to={`/chat/profile/${receiver._id}`}>
        <UserInfoContainer id="receiver-info">
          <Avatar
            src={
              receiver.avatarUrl || '../../src/assets/images/defaultAvatar.webp'
            }
            alt={`${receiver.username}'s avatar`}
          />
          <h2>{receiver.username}</h2>
        </UserInfoContainer>{' '}
      </StyledLink>
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
          ref={formRef}
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
          />
          <SendButton type="submit">Send</SendButton>
        </fetcher.Form>
      </InputContainer>
    </ChatArea>
  );
}
