import styled from 'styled-components';
import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

function LoginForm() {
  const [formInputs, setFormInputs] = useState({ password: '', username: '' });
  const errorData = useActionData();
  const navigation = useNavigation();

  const buttonText =
    navigation.state === 'submitting' ? 'Logging in...' : 'Login';

  function onInputChange(inputName, value) {
    setFormInputs({ ...formInputs, [inputName]: value });
  }

  return (
    <FormContainer>
      <h1>Login</h1>

      <StyledForm action="/login" method="POST">
        {errorData && <ErrorMessage>{errorData.error}</ErrorMessage>}

        <StyledLabel htmlFor="username">Username:</StyledLabel>
        <StyledInput
          id="username"
          name="username"
          type="text"
          value={formInputs.username}
          onChange={(event) => {
            onInputChange('username', event.target.value);
          }}
          required
        />

        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          id="password"
          name="password"
          type="password"
          value={formInputs.password}
          onChange={(event) => {
            onInputChange('password', event.target.value);
          }}
          required
        />

        <StyledButton type="submit">{buttonText}</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}

export default LoginForm;
