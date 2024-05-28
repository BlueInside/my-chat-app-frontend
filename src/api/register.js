import axios from 'axios';
import { redirect } from 'react-router-dom';

async function registerAction({ request }) {
  try {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const url =
      'https://my-chat-app-production-7100.up.railway.app/authenticate/register';

    const response = await axios.post(url, data, {
      signal: request.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      return redirect('/chat');
    } else {
      return { error: 'No token received' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return { error: 'Incorrect username or password' };
      } else if (
        error.response.data.message &&
        /E11000/i.test(error.response.data.message)
      ) {
        return { error: 'Username already exists, please choose another one' };
      } else {
        return { error: 'An error occurred during register' };
      }
    } else if (error.request) {
      console.error('No response received');
      return {
        error:
          'Network error or server did not respond, please try again later',
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        error: 'An unexpected error occurred, please try again later',
      };
    }
  }
}

export { registerAction };
