import axiosInstance from '../utils/axiosInstance';

const usersLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const response = await axiosInstance.get(`/users`, {
      params: { q: q },
    });
    return { users: response.data.users, q };
  } catch (error) {
    console.error('Failed to fetch users', error);
    return { users: [] };
  }
};

export { usersLoader };
