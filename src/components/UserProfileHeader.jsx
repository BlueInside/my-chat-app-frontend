import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 728px) {
    flex-direction: column;
    margin-bottom: 15px;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;

  @media (max-width: 728px) {
    width: 80px;
    height: 80px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Username = styled.h2`
  font-size: 1.5em;

  @media (max-width: 728px) {
    font-size: 1.2em;
    text-align: center;
  }
`;

export default function UserProfileHeader({ avatarUrl, username }) {
  return (
    <HeaderContainer>
      <Avatar
        src={avatarUrl || '../../src/assets/images/defaultAvatar.webp'}
        alt={`${username}'s avatar`}
      />
      <Username>{username}</Username>
    </HeaderContainer>
  );
}

UserProfileHeader.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
};
