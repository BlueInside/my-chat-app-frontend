import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ProfilePage from '../../pages/ProfilePage';

const mockUseAuth = vi.fn();
vi.mock('../../utils/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

const mockUserData = {
  _id: 'user1',
  username: 'Karol',
  fullName: 'Karol Pulawski',
  bio: 'My very interesting bio',
  avatarUrl: '#',
  dateOfBirth: '1997 05 18',
};

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <ProfilePage />,
      loader: () => mockUserData,
    },
    { path: 'edit', element: <div>Edit profile page</div> },
  ],
  { initialEntries: ['/'] }
);

describe('ProfilePage Component', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Renders Profile page properly', () => {
    mockUseAuth.mockReturnValue({ user: { id: 'user1' } });
    const { container } = render(<RouterProvider router={router} />);

    expect(container).toMatchSnapshot();
  });

  it(`Should display edit button when current user id is same as profile param id`, async () => {
    mockUseAuth.mockReturnValue({ user: { id: 'user1' } });
    render(<RouterProvider router={router} />);

    const editProfileButton = screen.getByRole('link', {
      name: /edit profile/i,
    });

    expect(editProfileButton).toBeInTheDocument();
  });

  it(`Shouldn't display edit button when current user id is different than profile param id`, async () => {
    mockUseAuth.mockReturnValue({ user: { id: 'user2' } });

    render(<RouterProvider router={router} />);

    const editProfileButton = screen.queryByRole('link', {
      name: /edit profile/i,
    });

    expect(editProfileButton).not.toBeInTheDocument();
  });
});
