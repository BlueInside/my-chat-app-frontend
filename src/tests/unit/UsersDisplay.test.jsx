import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsersDisplay from '../../components/UsersDisplay';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const mockAxios = new MockAdapter(axios);

let router;
describe('UsersDisplay component', () => {
  beforeEach(() => {
    mockAxios.resetHandlers();
    mockAxios.reset();

    const mockLocalStorage = {
      getItem: vi.fn().mockImplementation((key) => {
        if (key === 'token') return 'mock-token';
        return null;
      }),
    };
    globalThis.localStorage = mockLocalStorage;

    mockAxios.onGet('http://localhost:3000/conversations').reply(200, {
      conversations: [
        {
          id: '123',
          participants: ['user1', 'user2'],
          participantsInfo: [{ username: 'User1' }, { username: 'User2' }],
        },
      ],
    });
  });

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
    mockAxios
      .onGet('http://localhost:3000/users', { params: { q: 'jo' } })
      .reply(200, {
        users: [
          { id: 1, username: 'john' },
          { id: 2, username: 'jane' },
        ],
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

  it('Creates or fetches a conversation when a user item is clicked', async () => {
    mockAxios.onPost('http://localhost:3000/conversations').reply(200, {
      conversation: { id: '123', participants: ['user1', 'user2'] },
    });

    const user = userEvent.setup();

    const mockUsers = [{ _id: 'user2', username: 'TestUser' }];

    router = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <UsersDisplay
              setConversations={vi.fn()}
              conversations={[]}
              users={mockUsers}
            />
          ),
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);

    await user.click(screen.getByText(/testUser/i));

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1);
      expect(mockAxios.history.post[0].url).toBe(
        'http://localhost:3000/conversations'
      );
    });
  });

  it(`Should not create duplicate conversations`, async () => {
    mockAxios.onPost('http://localhost:3000/conversations').reply(409, {
      message: 'Conversation already exists',
    });

    const user = userEvent.setup();

    const mockUsers = [{ _id: 'user2', username: 'TestUser' }];

    router = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <UsersDisplay
              setConversations={vi.fn()}
              conversations={[{ participants: ['user1', 'user2'] }]}
              users={mockUsers}
            />
          ),
        },
      ],
      { initialEntries: ['/'] }
    );
    render(<RouterProvider router={router} />);

    await user.click(screen.getByText(/testUser/i));

    await waitFor(() => {
      expect(
        screen.getByText('Conversation already exists')
      ).toBeInTheDocument();
    });
  });

  it('Should call setConversation when successfully created', async () => {
    const mockSetConversations = vi.fn();

    mockAxios.onPost('http://localhost:3000/conversations').reply(200, {
      conversation: { id: '123', participants: ['user1', 'user2'] },
    });

    const user = userEvent.setup();

    const mockUsers = [{ _id: 'user2', username: 'TestUser' }];

    router = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <UsersDisplay
              setConversations={mockSetConversations}
              conversations={[]}
              users={mockUsers}
            />
          ),
        },
      ],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);

    await user.click(screen.getByText(/testUser/i));

    await waitFor(() => {
      expect(mockSetConversations).toHaveBeenCalled(2);
    });
  });
});
