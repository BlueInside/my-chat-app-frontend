import { describe, expect, it } from 'vitest';
import ChatPage from '../pages/ChatPage';
import { render, screen } from '@testing-library/react';

describe('ChatPage component', () => {
  it('Should display list conversation list', () => {
    render(<ChatPage />);

    expect(screen.getByLabelText('search-bar')).toBeInTheDocument();
    expect(screen.getByRole('conversation-list')).toBeInTheDocument();
  });
});
