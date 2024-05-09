import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import RegistrationPrompt from '../components/RegistrationPrompt';
import { useAuth } from '../utils/AuthContext';

function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to={'/chat'} />;

  return (
    <>
      <Navbar />
      <LoginForm />
      <RegistrationPrompt />
    </>
  );
}

export default LoginPage;
