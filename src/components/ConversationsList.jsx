import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const ConversationContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

const ConversationItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Username = styled.p`
  font-weight: bold;
  margin: 0;
`;

const LastMessage = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9em;
`;

export default function ConversationsList({ conversations }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!conversations || conversations.length === 0) {
    return <p>Yours conversations will be displayed here</p>;
  }

  return (
    <ConversationContainer>
      {conversations.map((conversation) => {
        // Don't display your name
        const otherParticipant = conversation.participants.find(
          (participant) => {
            return participant._id !== user.id;
          }
        );
        return (
          <ConversationItem
            key={conversation._id}
            onClick={() => {
              navigate(`${conversation._id}`);
            }}
          >
            <Username>
              {otherParticipant ? otherParticipant.username : 'unknown'}
            </Username>
            {/* Check if there's last message */}
            {conversation?.lastMessage?.text && (
              <LastMessage>{conversation.lastMessage.text}</LastMessage>
            )}
          </ConversationItem>
        );
      })}
    </ConversationContainer>
  );
}

ConversationsList.propTypes = {
  conversations: PropTypes.array,
};
