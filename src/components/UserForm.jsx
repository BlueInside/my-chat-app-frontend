import { useFetcher } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 30px auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const FileInput = styled(Input)`
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function UserForm({ user }) {
  const fetcher = useFetcher();

  return (
    <FormContainer>
      <fetcher.Form
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <FormGroup>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            aria-label="Full name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="avatar">Avatar</Label>
          <FileInput
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            placeholder="Choose a profile picture"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            aria-label="Date of Birth"
            placeholder="Enter your date of birth"
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </fetcher.Form>
    </FormContainer>
  );
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
};
