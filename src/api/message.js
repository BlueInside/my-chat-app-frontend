import axios from 'axios';

const messageAction = async ({ request }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response('Authentication required', { status: 401 });
  }

  const formData = Object.fromEntries(await request.formData());
  const response = await axios.post(
    'http://localhost:3000/messages',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 201) {
    const event = new CustomEvent('messageSent');
    window.dispatchEvent(event);
  }
  return response.data;
};

export { messageAction };
