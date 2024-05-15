import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import ConversationView from '../../components/ConversationView';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthContext } from '../../utils/AuthContext';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

const mockAxios = new MockAdapter(axios);

let mockConversation = {
  id: 'conv1',
  participants: ['user1', 'user2'],
  messages: [
    {
      receiver: 'user2',
      sender: 'user1',
      read: false,
      id: 'msg1',
      text: 'Hello!',
      timestamp: '2020-01-01T00:00:00Z',
    },
    {
      receiver: 'user1',
      sender: 'user2',
      read: false,
      id: 'msg2',
      text: 'Hi there!',
      timestamp: '2020-01-01T00:01:00Z',
    },
  ],
};

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <AuthContext.Provider value={{ user: { id: 1, username: 'user1' } }}>
        <ConversationView />
      </AuthContext.Provider>
    ),
    loader: () => {
      return mockConversation;
    },
  },
]);

describe('ConversationView component', () => {
  beforeEach(() => {
    mockAxios.reset();
    mockAxios.restore();

    // Mock the sendMessage API endpoint
    mockAxios.onPost('http://localhost:3000/messages').reply(201, {
      data: {
        id: 'newMessageId',
        text: 'Hello, world!',
        sender: 'userId',
        receiver: 'otherUserId',
        createdAt: new Date().toISOString(),
      },
    });
  });

  it('Should display conversation detail with messages', async () => {
    render(<RouterProvider router={router} />);

    const message = screen.getByText('Hello!');
    const message2 = screen.getByText('Hi there!');

    const messages = screen.getAllByRole('listitem');

    expect(message).toBeInTheDocument();
    expect(message2).toBeInTheDocument();
    expect(messages).toHaveLength(2);
  });

  it('Should sends a new message and displays it in the conversation', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const messageInput = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(messageInput, 'Hello, world!');
    await user.click(sendButton);

    await waitFor(() => {
      const messages = screen
        .getAllByRole('listitem')
        .map((li) => li.textContent);

      expect(messages).toContain('Hello, world!');
    });
  });
});
