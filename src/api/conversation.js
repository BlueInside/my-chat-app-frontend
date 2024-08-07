import axios from 'axios';
const conversationLoader = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Response('Authentication required', { status: 401 });

  const url = 'https://my-chat-app-production-01c1.up.railway.app/conversations';

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

const conversationDetailLoader = async ({ params }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response('Authentication required', { status: 401 });
  }
  try {
    const response = await axios.get(
      `https://my-chat-app-production-01c1.up.railway.app/conversations/${params.conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.conversation;
  } catch (error) {
    console.error('Error fetching conversation details:', error);

    // Error handling based on the HTTP status code from the backend
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          throw new Response('Conversation not found.', { status: 404 });
        case 403:
          throw new Response('User not authorized to view these messages', {
            status: 403,
          });
        default:
          throw new Response(
            data.message ||
            'An error occurred while fetching conversation details.',
            { status }
          );
      }
    } else {
      // For network errors or other issues not explicitly related to the HTTP response
      throw new Response(
        'Failed to connect to the server. Please check your network connection.',
        { status: 500 }
      );
    }
  }
};

export { conversationLoader, conversationDetailLoader };
