import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ConversationsList from '../components/ConversationsList';
import { mockConversation } from './mocks/mockConversation';

describe('ConversationsList component', () => {
  it('Should display custom text if no conversations started', async () => {
    render(<ConversationsList conversations={[]} />);

    expect(
      screen.getByText('Yours conversations will be displayed here')
    ).toBeInTheDocument();
  });

  it('Should display conversation properly', async () => {
    render(<ConversationsList conversations={mockConversation} />);

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
