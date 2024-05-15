import PropTypes from 'prop-types';
export default function ConversationsList({ conversations }) {
  if (!conversations || conversations.length <= 0) {
    return <p>Yours conversations will be displayed here</p>;
  }

  return (
    <ul>
      {conversations &&
        conversations.length > 0 &&
        conversations.map((c) => (
          <li key={c._id}>
            <div>
              <p>{c.participants[0].username}</p>
              <p>{c.lastMessage}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}

ConversationsList.propTypes = {
  conversations: PropTypes.array,
};
