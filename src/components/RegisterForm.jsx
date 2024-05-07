import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';

function RegisterForm() {
  const [formInputs, setFormInputs] = useState({ password: '', username: '' });
  const errorData = useActionData();
  const validationErrors = errorData?.errors;

  function onInputChange(inputName, value) {
    setFormInputs({ ...formInputs, [inputName]: value });
  }

  return (
    <>
      <h1>Register</h1>
      <Form action="/register" method="POST">
        <div>
          {validationErrors && (
            <ul>
              {validationErrors.map((e, i) => (
                <li key={i}>{e.msg}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formInputs.username}
            onChange={(event) => {
              onInputChange(event.target.name, event.target.value);
            }}
            minLength={5}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formInputs.password}
            onChange={(event) => {
              onInputChange(event.target.name, event.target.value);
            }}
            minLength={8}
            required
          />
        </div>

        <div>
          <button type="submit">Sign-up</button>
        </div>
      </Form>
    </>
  );
}

export default RegisterForm;
