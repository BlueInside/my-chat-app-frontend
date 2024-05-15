import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import SearchBar from '../components/SearchBar';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let router;
const mockAxios = new MockAdapter(axios);

describe('SearchBar component', () => {
  beforeEach(() => {
    mockAxios.resetHandlers();
    mockAxios.onAny().reply(404); // Catch-all to prevent unhandled request errors
    mockAxios
      .onGet('http://localhost:3000/users', { params: { q: 'jo' } })
      .reply(200, {
        users: [
          { id: 1, username: 'john' },
          { id: 2, username: 'jane' },
        ],
      });
  });

  router = createMemoryRouter(
    [
      {
        path: '/',
        element: <SearchBar />,
        loader: async () => {
          return { users: [{ _id: 3, username: 'hello' }], q: '' };
        },
      },
    ],
    { initialEntries: ['/'] }
  );
  it('Renders search input', () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('Handles input changes', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, 'hello');

    expect(searchInput.value).toBe('hello');
  });

  it('Fetches and displays results based on search input', async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const searchInput = screen.getByPlaceholderText('Search...');

    await user.type(searchInput, 'hello');
    await user.keyboard('Enter');

    await waitFor(() => {
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it('Should not display users if not focused', async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const searchInput = screen.getByPlaceholderText('Search...');

    await user.type(searchInput, 'hello');
    await user.keyboard('Enter');
    await user.tab();

    await waitFor(() => {
      const userListItems = screen.queryAllByRole('listitem');
      expect(userListItems).toHaveLength(0);
    });
  });
});
