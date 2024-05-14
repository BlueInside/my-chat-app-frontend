import axios from 'axios';

const usersLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    console.log(url);
    const q = url.searchParams.get('q');
    const response = await axios.get(`http://localhost:3000/users`, {
      params: { q: q },
    });
    console.log(q);
    return { users: response.data.users, q };
  } catch (error) {
    console.error('Failed to fetch users', error);
    return { users: [] };
  }
};

export { usersLoader };
