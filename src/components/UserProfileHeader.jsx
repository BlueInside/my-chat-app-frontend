import PropTypes from 'prop-types';

const UserProfileHeader = ({ avatarUrl, username }) => {
  return (
    <div>
      <img
        src={avatarUrl || '../../src/assets/images/defaultAvatar.webp'}
        alt="avatar"
      />
      <p>{username}</p>
    </div>
  );
};

export default UserProfileHeader;

UserProfileHeader.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
};
