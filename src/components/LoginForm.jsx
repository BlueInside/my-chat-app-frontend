import { Form } from 'react-router-dom';

function LoginForm() {
  return (
    <Form>
      <label htmlFor="username">Username:</label>
      <input id="username" name="username" type="text" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <button type="submit">Login</button>
    </Form>
  );
}

export default LoginForm;
