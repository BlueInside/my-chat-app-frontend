import { beforeEach, describe, expect, it, vi } from 'vitest';
import ChatPage from '../pages/ChatPage';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { mockConversation } from './mocks/mockConversation.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);
let mockLoaderResponse = mockConversation;

const mockConversationLoader = vi.fn(() => Promise.resolve(mockLoaderResponse));

describe('ChatPage component', () => {
  let router;

  beforeEach(() => {
    mock.reset();
    // reset mock loader response to mockConversation
    mockLoaderResponse = mockConversation;
    router = createMemoryRouter(
      [
        {
          path: '/chat',
          element: <ChatPage />,
          loader: mockConversationLoader,
        },
      ],
      { initialEntries: ['/chat'] }
    );
  });

  it('Should display custom text if no conversations started', async () => {
    router = createMemoryRouter(
      [
        {
          path: '/chat',
          element: <ChatPage />,
          loader: () => Promise.resolve([]), // Return empty array
        },
      ],
      { initialEntries: ['/chat'] }
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByText('Yours conversations will be displayed here')
      ).toBeInTheDocument();
    });
  });

  it('Should display conversation properly', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      const conversationName = screen.getByText(
        mockConversation[0].participants[0].username
      );
      const conversationLastMessage = screen.getByText(
        mockConversation[0].lastMessage
      );

      expect(conversationName).toBeInTheDocument();
      expect(conversationLastMessage).toBeInTheDocument();
    });
  });
});
