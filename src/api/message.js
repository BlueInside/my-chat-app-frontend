import axiosInstance from '../utils/axiosInstance';

const messageAction = async ({ request }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response('Authentication required', { status: 401 });
  }

  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  const response = await axiosInstance.post('/messages', formData);

  return response.data;
};

export { messageAction };
