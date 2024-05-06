import { useNavigate } from 'react-router-dom';

function RegistrationPrompt() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Not having account yet?</p>
      <button
        type="button"
        onClick={() => {
          navigate('/register');
        }}
      >
        Register
      </button>
    </div>
  );
}

export default RegistrationPrompt;
