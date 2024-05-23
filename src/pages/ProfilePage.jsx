import { useLoaderData } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserProfileHeader from '../components/UserProfileHeader';

function ProfilePage() {
  const user = useLoaderData();

  return (
    <div>
      <UserProfileHeader avatarUrl={user.avatarUrl} username={user.username} />
      <UserForm />
    </div>
  );
}

export default ProfilePage;
