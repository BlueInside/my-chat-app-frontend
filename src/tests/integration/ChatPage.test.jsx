import {
  RouterProvider,
  createMemoryRouter,
  useLoaderData,
} from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ChatPage from '../../pages/ChatPage';
import { useAuth } from '../../utils/AuthContext';
import { conversationLoader } from '../../api/conversation';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../utils/AuthContext');
vi.mock('../../api/conversation');

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();

  return { ...actual, useLoaderData: vi.fn() };
});

describe('ChatPage component', () => {
  beforeEach(() => {
    useLoaderData.mockReturnValue({
      users: [
        { id: '1', username: 'Alice' },
        { id: '2', username: 'Bob' },
      ],
    });

    useAuth.mockReturnValue({ user: { id: 'user1', username: 'karol' } });

    conversationLoader.mockResolvedValue([
      {
        _id: '1',
        participants: [
          { _id: 'user1', username: 'karol' },
          { _id: 'user2', username: 'johny' },
        ],
        lastMessage: { text: 'Hello there!', _id: 'msg1' },
      },
    ]);
  });

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <ChatPage />,
        children: [
          {
            path: '/:conversationId',
            element: <div>Conversation Details</div>,
          },
        ],
      },
    ],
    { initialEntries: ['/'], initialIndex: 0 }
  );
  it('should display ConversationView component on conversation click', async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Hello there!')).toBeInTheDocument();
    });

    await user.click(screen.getByText('johny'));

    await waitFor(() => {
      expect(screen.getByText('Conversation Details')).toBeInTheDocument();

    });
  });
});
