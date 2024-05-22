import { redirect } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

async function registerAction({ request }) {
  try {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const url = '/authenticate/register';

    const response = await axiosInstance.post(url, data, {
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
    if (error.response?.data?.errors) {
      // Return validation errors
      return { errors: error.response.data.errors };
    }

    if (error.response) {
      console.error('Server responded with:', error.response.status);
      console.error('Response data:', error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      console.error('No response received');
      return {
        error:
          'Network error or server did not respond, please try again later',
      };
    } else {
      console.error('Error setting up request:', error.message);
      return { error: error.message };
    }
  }
}

export { registerAction };
