import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/AuthContext';

const ConversationContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto; // Allows scrolling within the list if it's too long
`;

const ConversationItem = styled.li`
  border-bottom: 1px solid #ccc; // Adds a subtle separator between items
  padding: 10px; // Padding inside each list item
  cursor: pointer; // Indicates that an item is clickable

  &:hover {
    background-color: #f5f5f5; // Light grey background on hover
  }
`;

const Username = styled.p`
  font-weight: bold; // Makes the username stand out
  margin: 0; // Removes default margin
`;

const LastMessage = styled.p`
  color: #666; // Grey text for the last message
  margin: 0; // Removes default margin
  font-size: 0.9em; // Slightly smaller font size for the message
`;

export default function ConversationsList({ conversations }) {
  const { user } = useAuth();
  console.log(user);
  if (!conversations || conversations.length === 0) {
    return <p>Yours conversations will be displayed here</p>;
  }

  return (
    <ConversationContainer>
      {conversations.map((conversation) => {
        // Don't display your name
        const otherParticipant = conversation.participants.find(
          (participant) => {
            console.log(participant._id, user.id);
            return participant._id !== user.id;
          }
        );
        return (
          <ConversationItem key={conversation._id}>
            <Username>
              {otherParticipant ? otherParticipant.username : 'unknown'}
            </Username>
            <LastMessage>{conversation.lastMessage}</LastMessage>
          </ConversationItem>
        );
      })}
    </ConversationContainer>
  );
}

ConversationsList.propTypes = {
  conversations: PropTypes.array,
};
