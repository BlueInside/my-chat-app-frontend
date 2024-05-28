import axios from 'axios';

const usersLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const response = await axios.get(`http://localhost:3000/users`, {
      params: { q: q },
    });
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
      `http://localhost:3000/users/${params.profileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('User Loader: ', response.data);
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
  formData = Object.fromEntries(formData);
  console.log(formData);
  return null;
  // try {
  //   const response = await axios.get(
  //     `http://localhost:3000/users/${params.profileId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log('User Loader: ', response.data);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error fetching user details:', error);

  //   // Error handling based on the HTTP status code from the backend
  //   if (error.response) {
  //     const { status, data } = error.response;
  //     switch (status) {
  //       case 404:
  //         throw new Response('Conversation not found.', { status: 404 });
  //       default:
  //         throw new Response(
  //           data.message || 'An error occurred while fetching user details.',
  //           { status }
  //         );
  //     }
  //   } else {
  //     // For network errors or other issues not explicitly related to the HTTP response
  //     throw new Response(
  //       'Failed to connect to the server. Please check your network connection.',
  //       { status: 500 }
  //     );
  //   }
  // }
};

export { usersLoader, userLoader, editUserAction };
