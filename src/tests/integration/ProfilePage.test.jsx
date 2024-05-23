import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProfilePage from '../../pages/ProfilePage';

let mockUserData = {
  _id: 'user1',
  username: 'Karol',
  fullName: 'Karol Pulawski',
  bio: 'My very interesting bio',
  avatarUrl: '#',
  dateOfBirth: new Date('1997 05 18'),
};

let router = createMemoryRouter(
  [
    {
      path: '/',
      element: <ProfilePage />,
      loader: () => mockUserData,
    },
  ],
  { initialEntries: ['/'] }
);

describe('ProfilePage Component', async () => {
  it('Renders Profile page properly', () => {
    const { container } = render(<RouterProvider router={router} />);

    expect(container).toMatchSnapshot();
  });
});
