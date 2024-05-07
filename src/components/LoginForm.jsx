import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';

function LoginForm() {
  const [formInputs, setFormInputs] = useState({ password: '', username: '' });
  const errorData = useActionData();

  function onInputChange(inputName, value) {
    setFormInputs({ ...formInputs, [inputName]: value });
  }

  return (
    <>
      <h1>Login</h1>

      <Form action="/login" method="POST">
        <div>{errorData && <p>{errorData.error}</p>}</div>
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
            required
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
