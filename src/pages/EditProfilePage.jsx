import UserProfileHeader from '../components/UserProfileHeader';
import styled from 'styled-components';
import UserForm from '../components/UserForm';

import { useLoaderData } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

export default function EditProfilePage() {
  const user = useLoaderData();

  return (
    <Container>
      <UserProfileHeader avatarUrl={user?.avatarUrl} username={user.username} />
      <UserForm user={user} />
    </Container>
  );
}
