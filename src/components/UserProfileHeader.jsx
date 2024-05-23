import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d3d3d3;
  background-color: #f0f0f0;
  margin-right: 15px;
`;

const Username = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const UserProfileHeader = ({ avatarUrl, username }) => {
  return (
    <Container>
      <Avatar
        src={avatarUrl || '../../src/assets/images/defaultAvatar.webp'}
        alt="avatar"
      />
      <Username>{username}</Username>
    </Container>
  );
};
export default UserProfileHeader;

UserProfileHeader.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
};
