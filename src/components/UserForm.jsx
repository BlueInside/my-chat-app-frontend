import { Form } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  width: fit-content;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  justify-content: space-evenly;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function UserForm({ user }) {
  const [fileError, setFileError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file && !validTypes.includes(file.type)) {
      setFileError(
        'Unsupported file type. Please select an image (JPEG, PNG, GIF, WEBP).'
      );
      event.target.value = '';
    } else {
      setFileError(''); // Clear error if file is valid
    }
  };

  return (
    <FormContainer>
      <Form
        method="put"
        encType="multipart/form-data"
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <FormGroup>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            aria-label="Full name"
            placeholder="Full name"
            defaultValue={user.fullName || ''}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bio">Bio</Label>
          <FileInput
            id="bio"
            name="bio"
            type="text"
            aria-label="bio"
            placeholder="Type some stuff about yourself"
            defaultValue={user.bio || ''}
          />
        </FormGroup>
        <FormGroup>
          {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
          <Label htmlFor="avatar">Avatar</Label>
          <FileInput
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            onChange={handleFileChange}
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
            defaultValue={
              user.dateOfBirth ? user.dateOfBirth.split('T')[0] : ''
            }
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
};
