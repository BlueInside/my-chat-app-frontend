import PropTypes from 'prop-types';
export default function UsersDisplay({ users }) {
  if (!users || users.length === 0) return null;
  return (
    <div>
      <ul>
        {users &&
          users.length > 0 &&
          users.map((u) => <li key={u._id}>{u.username}</li>)}
      </ul>
    </div>
  );
}

UsersDisplay.propTypes = {
  users: PropTypes.array,
};
