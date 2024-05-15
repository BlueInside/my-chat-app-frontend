import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import ConversationView from '../components/ConversationView';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../utils/AuthContext';

const mockConversation = {
  id: 'conv1',
  participants: ['user1', 'user2'],
  messages: [
    {
      id: 'msg1',
      sender: 'user1',
      text: 'Hello!',
      timestamp: '2020-01-01T00:00:00Z',
    },
    {
      id: 'msg2',
      sender: 'user2',
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
  beforeEach(() => {});

  it('Should display conversation detail with messages', async () => {
    render(<RouterProvider router={router} />);

    const message = screen.findByText('Hello!');
    const message2 = screen.findByText('Hi there!');

    const messages = screen.getAllByRole('listitem');

    expect(message).toBeInTheDocument();
    expect(message2).toBeInTheDocument();
    expect(messages).toHaveLength(2);
  });
});
