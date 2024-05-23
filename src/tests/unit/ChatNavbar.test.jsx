import { describe, expect, it, vi } from 'vitest';
import ChatNavbar from '../../components/ChatNavbar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ChatNavbar component', () => {
  const mockLogout = vi.fn();

  it('Should render ChatNavbar with logo, logout, and profile Links', async () => {
    render(
      <MemoryRouter>
        <ChatNavbar logout={mockLogout} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
