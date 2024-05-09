import { beforeEach, describe, expect, it } from 'vitest';
import ChatPage from '../pages/ChatPage';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { mockConversation } from './mocks/mockConversation.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);

describe('ChatPage component', () => {
  let router;

  beforeEach(() => {
    mock.reset();

    router = createMemoryRouter(
      [
        {
          path: '/chat',
          element: <ChatPage />,
        },
      ],
      { initialEntries: ['/chat'] }
    );
  });

  it('Should display list conversation list', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText('Search conversation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('Should display conversation properly', async () => {
    mock
      .onGet('http://localhost:3000/conversations')
      .reply(200, mockConversation);

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const conversationName = screen.getByText(
        mockConversation.participants[0].username
      );
      const conversationLastMessage = screen.getByText(
        mockConversation.lastMessage
      );

      expect(conversationName).toBeInTheDocument();
      expect(conversationLastMessage).toBeInTheDocument();
    });
  });
});
