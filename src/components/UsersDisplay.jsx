import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { conversationLoader } from '../api/conversation';

const Container = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 65px;
`;

const UserList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  max-height: 200px; /* Adjust based on your preference to show 5 items */
  overflow-y: scroll; /* Enables vertical scrolling */
  border-top: 1px solid #d3d3d3; /* Adds a subtle border at the top */
`;

const UserItem = styled.li`
  /* Changed from div to li for semantic correctness */
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d3d3d3; /* Adds a border between items */
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
  setError,
}) {
  async function fetchConversations() {
    try {
      const data = await conversationLoader();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }

  const createConversation = async (receiverId) => {
    const token = localStorage.getItem('token');

    await fetchConversations(); /* Added await to ensure fetchConversations completes before the check */

    if (
      conversations.some((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === receiverId
        )
      )
    ) {
      setError('Conversation already exists');
      return;
    }

    try {
      await axios.post(
        'https://my-chat-app-production-7100.up.railway.app/conversations',
        {
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchConversations();
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Conversation already exists');
      } else {
        console.error('Error creating or fetching conversation', error);
        setError('Failed to create conversation');
      }
    }
  };

  const handleCreateConversations = async (receiverId) => {
    await createConversation(receiverId);
  };

  if (!users || users.length === 0) return null;

  return (
    <Container>
      <UserList>
        {users.map((user) => (
          <UserItem
            key={user._id}
            onClick={() => {
              handleCreateConversations(user._id);
            }}
          >
            <Avatar
              src={
                user.avatarUrl ||
                'https://res.cloudinary.com/dhjzutfu9/image/upload/v1716908636/defaultAvatar_lxatx0.webp'
              }
            />
            <p>{user.username}</p>
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
  ).isRequired,
  conversations: PropTypes.array,
  setConversations: PropTypes.func,
  setError: PropTypes.func.isRequired,
};
