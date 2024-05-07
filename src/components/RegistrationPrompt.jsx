import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PromptContainer = styled.div`
  text-align: center;
  margin: auto;
  padding: 10px;
  border-radius: 8px;
  max-width: 800px;
`;

const PromptText = styled.p`
  margin: 0;
  padding-bottom: 10px;
  color: #333;
`;

const PromptButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-size: 1.1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

function RegistrationPrompt() {
  const navigate = useNavigate();

  return (
    <PromptContainer>
      <PromptText>Not having account yet?</PromptText>
      <PromptButton
        type="button"
        onClick={() => {
          navigate('/register');
        }}
      >
        Register
      </PromptButton>
    </PromptContainer>
  );
}

export default RegistrationPrompt;
