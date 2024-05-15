import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  border-radius: 10px;
  width: 100%;
  top: 65px;
`;

const UserList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 200px; // Adjust based on your preference to show 5 items
  overflow-y: scroll; // Enables vertical scrolling
  border-top: 1px solid #d3d3d3; // Adds a subtle border at the top
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d3d3d3; // Adds a border between items
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9e9e9;
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

export default function UsersDisplay({
  users,
  conversations,
  setConversations,
}) {
  const [error, setError] = useState('');

  const createConversation = async (receiverId) => {
    if (conversations.some((c) => c.participants.includes(receiverId))) {
      setError('Conversation already exists');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/conversations', {
        receiverId: receiverId,
      });
      setConversations((prev) => [...prev, response.data.conversation]);
      setError('');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setError('Conversation already exists');
      } else {
        console.error('Error creating or fetching conversation', error);
        setError('Failed to create conversation');
      }
    }
  };

  if (!users || users.length === 0) return null;

  return (
    <Container>
      {error && <p>{error}</p>}
      <UserList>
        {users.map((user) => (
          <UserItem
            key={user._id}
            onClick={() => {
              createConversation(user._id);
            }}
          >
            <Avatar
              src={
                user.avatarUrl || '../../src/assets/images/defaultAvatar.webp'
              }
            />
            <li>{user.username}</li>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
}

UsersDisplay.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
  conversations: PropTypes.array,
  setConversations: PropTypes.func,
};
