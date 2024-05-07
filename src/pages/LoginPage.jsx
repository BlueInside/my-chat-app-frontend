import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import RegistrationPrompt from '../components/RegistrationPrompt';

function LoginPage() {
  return (
    <>
      <Navbar />
      <LoginForm />
      <RegistrationPrompt />
    </>
  );
}

export default LoginPage;
