import axios from 'axios';

const loginAction = async (data) => {
  try {
    if (!data) {
      return { error: 'Incorrect inputs data' };
    }
    const url = 'http://localhost:3000/authenticate/login';

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.token) {
      return response.data;
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
};

export { loginAction };
