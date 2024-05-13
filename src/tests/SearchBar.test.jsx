import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchBar from '../components/SearchBar';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let router;
const mockAxios = new MockAdapter(axios);

describe('SearchBar component', () => {
  router = createMemoryRouter(
    [
      {
        path: '/',
        element: <SearchBar />,
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

  it('Returns filtered usernames based on search query', async () => {
    const user = userEvent.setup();
    const mockResponse = [
      { id: 1, username: 'john' },
      { id: 2, username: 'jane' },
    ];

    mockAxios
      .onGet('http://localhost:3000/users', { params: { q: 'jo' } })
      .reply(200, mockResponse);

    render(<RouterProvider router={router} />);

    const searchInput = screen.getByPlaceholderText(/search/i);

    await user.type(searchInput, 'jo');

    await waitFor(() => {
      const results = screen
        .getAllByRole('listitem')
        .map((li) => li.textContent);

      expect(results).toEqual(['john', 'jane']);
    });
  });
});
