import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import UsersDisplay from '../components/UsersDisplay';
import { render, screen } from '@testing-library/react';

let router;
describe('UsersDisplay component', () => {
  let mockUsers = [
    { _id: 1, username: 'karol' },
    { _id: 2, username: 'justyna' },
  ];
  router = createMemoryRouter(
    [
      {
        path: '/',
        element: <UsersDisplay users={mockUsers} />,
      },
    ],
    { initialEntries: ['/'] }
  );

  it('Should display users correctly', () => {
    render(<RouterProvider router={router} />);

    const users = screen.getAllByRole('listitem');
    const usernames = Array.from(users, (u) => u.textContent);

    usernames.map((u, i) => {
      expect(u).toBe(mockUsers[i].username);
    });
    expect(users).toHaveLength(2);
  });

  it('Should display nothing when array of users is empty', async () => {
    router = createMemoryRouter(
      [
        {
          path: '/',
          element: <UsersDisplay users={[]} />,
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);
    const users = screen.queryAllByRole('listitem');
    expect(users).toHaveLength(0);
  });
});
