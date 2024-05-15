import axios from 'axios';
const conversationLoader = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Response('Authentication required', { status: 401 });

  const url = 'http://localhost:3000/conversations';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.conversations;
  } catch (error) {
    // Response returned from server but failed
    if (error.response) {
      console.error('Server responded with:', error.response.status);
      console.error('Response data:', error.response.data);
      throw new Error(
        error.response.data.message || 'Error fetching conversations'
      );
    } else if (error.request) {
      console.error('No response received');
      throw new Error('Network error or server did not respond');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error(error.message);
    }
  }
};

export { conversationLoader };
