import axios from 'axios';
import { redirect } from 'react-router-dom';

const usersLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const response = await axios.get(
      `https://my-chat-app-production-7100.up.railway.app/users`,
      {
        params: { q: q },
      }
    );
    return { users: response.data.users, q };
  } catch (error) {
    console.error('Failed to fetch users', error);
    return { users: [] };
  }
};

const userLoader = async ({ params }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response('Authentication required', { status: 401 });
  }

  try {
    const response = await axios.get(
      `https://my-chat-app-production-7100.up.railway.app/users/${params.profileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);

    // Error handling based on the HTTP status code from the backend
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 404:
          throw new Response('Conversation not found.', { status: 404 });
        default:
          throw new Response(
            data.message || 'An error occurred while fetching user details.',
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

const editUserAction = async ({ params, request }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Response('Authentication required', { status: 401 });
  }

  let formData = await request.formData();

  try {
    const response = await axios.put(
      `https://my-chat-app-production-7100.up.railway.app/users/${params.profileId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return redirect(`/chat/profile/${params.profileId}`);
  } catch (error) {
    console.error('Error fetching user details:', error);
    const e = {};
    // Error handling based on the HTTP status code from the backend

    const { status } = error.response;
    switch (status) {
      case 500:
        e.message =
          'Failed to update user profile due to imageStorage please contact admin';
        break;
      case 400:
        e.message = 'Failed to update user profile please try again later';
        break;
      case 403:
        e.message = 'Not enough permission to do that change';
        break;
      case 404:
        e.message = 'User not found';
        break;
      default:
        e.message = 'An error occurred while updating user details.';
    }
    return e;
  }
};

export { usersLoader, userLoader, editUserAction };
