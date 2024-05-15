import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ConversationsList from '../../components/ConversationsList';
import { mockConversation } from '../mocks/mockConversation';
import { AuthContext } from '../../utils/AuthContext';

describe('ConversationsList component', () => {
  it('Should display custom text if no conversations started', async () => {
    render(<ConversationsList conversations={[]} />);

    expect(
      screen.getByText('Yours conversations will be displayed here')
    ).toBeInTheDocument();
  });

  it('Should display conversation properly', async () => {
    render(
      <AuthContext.Provider
        value={{ user: mockConversation[0].participants[0] }}
      >
        <ConversationsList conversations={mockConversation} />
      </AuthContext.Provider>
    );

    const conversationName = screen.getByText(
      mockConversation[0].participants[1].username
    );
    const conversationLastMessage = screen.getByText(
      mockConversation[0].lastMessage
    );

    expect(conversationName).toBeInTheDocument();
    expect(conversationLastMessage).toBeInTheDocument();
  });
});
