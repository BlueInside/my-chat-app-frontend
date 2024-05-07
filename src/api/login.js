import axios from 'axios';
import { redirect } from 'react-router-dom';

async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const url = 'http://localhost:3000/authenticate/login';

    const response = await axios.post(url, data, {
      signal: request.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return redirect('/chat');
    } else {
      return { error: 'No token received' };
    }
  } catch (error) {
    if (error.response) {
      return { error: 'Incorrect username or password' };
    } else if (error.request) {
      console.error('No response received');
      return { error: 'Network error or server did not respond' };
    }
  }
}

export { loginAction };
