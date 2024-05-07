import LoginPrompt from '../components/LoginPrompt';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <LoginPrompt />
    </>
  );
}

export default RegisterPage;
