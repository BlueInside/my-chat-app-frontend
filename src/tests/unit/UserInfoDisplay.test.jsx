import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserInfoDisplay from '../../components/UserInfoDisplay';

const mockUser = {
  _id: '6639e12aa03eee645c772b6f',
  username: 'admin',
  fullName: 'Admin User',
  bio: 'This is the admin user bio.',
  role: 'admin',
  createdAt: '2024-05-07T08:07:06.679Z',
  lastActive: '2024-05-07T08:07:06.679Z',
  avatarUrl: '#',
};

describe('UserInfoDisplay component', () => {
  it('Should display user information properly', () => {
    render(<UserInfoDisplay user={mockUser} />);

    const username = screen.getByText(/username/i);
    const fullName = screen.getByText(/full name/i);
    const bio = screen.getByText(/bio:/i);
    const role = screen.getByText(/role/i);
    const lastActive = screen.getByText(/last active/i);
    const created = screen.getByText(/account created/i);

    expect(username).toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(lastActive).toBeInTheDocument();
    expect(created).toBeInTheDocument();
  });
});
