import { describe, expect, it, vi } from 'vitest';
import ChatNavbar from '../../components/ChatNavbar';
import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('ChatNavbar component', () => {
  const mockLogout = vi.fn();

  it('Should render ChatNavbar with logo, logout, and profile Links', async () => {
    render(
      <MemoryRouter>
        <ChatNavbar logout={mockLogout} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('Should call logout fn when clicked on logout link', async () => {
    mockLogout.mockRestore();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ChatNavbar logout={mockLogout} />
      </MemoryRouter>
    );

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    await user.click(logoutLink);

    expect(mockLogout).toHaveBeenCalledOnce();
  });

  it('Should navigate to /profile on profile link click', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ChatNavbar />,
        },
        {
          path: 'profile',
          element: <div>I am profile page</div>,
        },
      ],
      { initialEntries: ['/'] }
    );

    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const profileLink = screen.getByRole('link', { name: /profile/i });
    await user.click(profileLink);

    await waitFor(() => {
      expect(screen.getByText(/i am profile page/i)).toBeInTheDocument();
    });
  });
});
