import { useNavigate } from 'react-router-dom';

function LoginPrompt() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Already a member?</p>
      <button
        type="button"
        onClick={() => {
          navigate('/login');
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPrompt;
