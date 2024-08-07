import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ConversationView from '../../components/ConversationView';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthContext } from '../../utils/AuthContext';

// Mock axios
const mockAxios = new MockAdapter(axios);

describe('ConversationView interaction', () => {
  beforeEach(() => {
    // Set up and reset mocks before each test
    mockAxios.reset();
    // Mock successful post call for sending messages
    mockAxios
      .onPost('https://my-chat-app-production-01c1.up.railway.app/messages')
      .replyOnce(200, {
        message: 'Message sent successfully',
        data: {
          _id: '123',
          text: 'Hello, world!',
          sender: 'user1',
          receiverId: 'user2',
        },
      });
  });

  it('Should send a new message and display it in the conversation', async () => {
    mockAxios
      .onGet('/api/conversations/conversationId')
      .replyOnce(200, {
        conversationId: 'conversationId',
        participants: [{ _id: 'user1' }, { _id: 'user2' }],
        messages: [
          {
            _id: 'msg1',
            text: 'Initial message',
            sender: 'user1',
            receiverId: 'user2',
          },
        ],
      })
      .onGet('/api/conversations/conversationId')
      .replyOnce(200, {
        conversationId: 'conversationId',
        participants: [{ _id: 'user1' }, { _id: 'user2' }],
        messages: [
          {
            _id: 'msg1',
            text: 'Initial message',
            sender: 'user1',
            receiverId: 'user2',
          },
          {
            _id: '123',
            text: 'Hello, world!',
            sender: 'user1',
            receiverId: 'user2',
          }, // new message appears after post
        ],
      });

    const user = userEvent.setup();
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
        loader: async () => {
          const response = await axios.get('api/conversations/conversationId');
          return response.data;
        },
        action: async () => {
          const response = await axios.post(
            'https://my-chat-app-production-01c1.up.railway.app/messages',
            {
              _id: '123',
              text: 'Hello, world!',
              sender: 'user1',
              receiverId: 'user2',
            }
          );
          return response;
        },
      },
      {
        path: '/messages',
        action: async () => {
          const response = await axios.post(
            'https://my-chat-app-production-01c1.up.railway.app/messages',
            {
              _id: '123',
              text: 'Hello, world!',
              sender: 'user1',
              receiverId: 'user2',
            }
          );
          return response.data;
        },
      },
    ]);

    render(<RouterProvider router={router} />);

    let messageInput;
    let sendButton;

    await waitFor(() => {
      messageInput = screen.getByPlaceholderText(/type a message/i);
      sendButton = screen.getByRole('button', { name: /send/i });
    });

    const messages = screen.getAllByRole('listitem');
    expect(messages).toHaveLength(1);

    await user.type(messageInput, 'Hello, world!');
    await user.click(sendButton);

    await waitFor(() => {
      const messages = screen
        .getAllByRole('listitem')
        .map((li) => li.textContent);
      expect(messages).toContain('Hello, world!');
      expect(messages).toHaveLength(2);
    });
  });
});
