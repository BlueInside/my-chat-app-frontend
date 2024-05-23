import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

const InfoGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
  display: block;
`;

const Value = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-top: 5px;
`;

const UserInfoDisplay = ({ user }) => {
  return (
    <Container>
      <InfoGroup>
        <Label>Username:</Label>
        <Value>{user.username || 'N/A'}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>Full Name:</Label>
        <Value>{user.fullName || 'N/A'}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>Bio:</Label>
        <Value>{user.bio || 'N/A'}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>Role:</Label>
        <Value>{user.role}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>Last Active:</Label>
        <Value>{new Date(user.lastActive).toLocaleString()}</Value>
      </InfoGroup>
      <InfoGroup>
        <Label>Account Created:</Label>
        <Value>{new Date(user.createdAt).toLocaleString()}</Value>
      </InfoGroup>
    </Container>
  );
};

export default UserInfoDisplay;

UserInfoDisplay.propTypes = {
  user: PropTypes.object.isRequired,
};
