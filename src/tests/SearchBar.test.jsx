import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchBar from '../components/SearchBar';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

let router;

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
});
