import axios from 'axios';

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

    return response.data;
  } catch (error) {
    return { error: 'Incorrect username or password' };
  }
}

export { loginAction };
