import { useLoaderData } from 'react-router-dom';
import UserProfileHeader from '../components/UserProfileHeader';
import { useAuth } from '../utils/AuthContext';
import UserInfoDisplay from '../components/UserInfoDisplay';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const EditButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  width: fit-content;
  &:hover {
    background-color: #0056b3;
  }
`;

function ProfilePage() {
  const user = useLoaderData();
  const { user: currentUser } = useAuth();
  return (
    <Container>
      <UserProfileHeader avatarUrl={user.avatarUrl} username={user.username} />
      <UserInfoDisplay user={user} />
      {currentUser.id === user._id && (
        <EditButton to={'edit'}>Edit Profile</EditButton>
      )}
    </Container>
  );
}

export default ProfilePage;
