import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import ConversationView from '../../components/ConversationView';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../utils/AuthContext';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockAxios = new MockAdapter(axios);

let mockConversation = {
  id: 'conv1',
  participants: [
    { _id: 'user1', username: 'user1', avatar: 'user1-avatar.png' },
    { _id: 'user2', username: 'user2', avatar: 'user2-avatar.png' },
  ],
  lastMessage: { text: 'Hi, there', _id: 'msg1' },
  messages: [
    {
      receiver: 'user2',
      sender: 'user1',
      read: false,
      _id: 'msg1',
      text: 'Hello!',
      timestamp: '2020-01-01T00:00:00Z',
    },
    {
      receiver: 'user1',
      sender: 'user2',
      read: false,
      _id: 'msg2',
      text: 'Hi there!',
      timestamp: '2020-01-01T00:01:00Z',
    },
  ],
};

const router = createMemoryRouter([
  {
    path: '/',
    element: (
      <AuthContext.Provider
        value={{ user: { _id: 'user1', username: 'user1' } }}
      >
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
    mockAxios.onPost('https://my-chat-app-production-01c1.up.railway.app/messages').reply(201, {
      data: {
        participants: [
          { _id: 'user1', username: 'karol', avatarUrl: '#' },
          { _id: 'user2', username: 'justyna', avatarUrl: '#' },
        ],
        _id: 'newMessageId',
        text: 'Hello, world!',
        sender: 'user1',
        receiverId: 'user2',
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

  it('Should display user and avatar of user we chat with', async () => {
    render(<RouterProvider router={router} />);

    const receiverName = screen.getByRole('heading', { name: 'user1' });
    const receiverIcon = screen.getByRole('img');

    expect(receiverName).toBeInTheDocument();
    expect(receiverIcon).toBeInTheDocument();
  });
});
