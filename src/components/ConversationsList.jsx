import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  if (!conversations || conversations.length === 0) {
    return <p>Yours conversations will be displayed here</p>;
  }

  return (
    <ConversationContainer>
      {conversations.map((conversation) => (
        <ConversationItem key={conversation._id}>
          <Username>{conversation.participants[1].username}</Username>
          <LastMessage>{conversation.lastMessage}</LastMessage>
        </ConversationItem>
      ))}
    </ConversationContainer>
  );
}

ConversationsList.propTypes = {
  conversations: PropTypes.array,
};
