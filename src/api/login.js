import axios from 'axios';

const loginAction = async (data) => {
  try {
    if (!data) {
      return { error: 'Incorrect inputs data' };
    }
    const url = 'https://my-chat-app-production-01c1.up.railway.app/authenticate/login';

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
      return {
        error:
          'Network error or server did not respond, please try again later',
      };
    }
  }
};

export { loginAction };
