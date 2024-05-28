import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserProfileHeader from '../../components/UserProfileHeader';

describe('UserProfileHeader component', () => {
  it('Should display user username and show user avatar', async () => {
    render(<UserProfileHeader username={'Karol'} avatarUrl={'#'} />);

    const avatar = screen.getByRole('img', { name: /avatar/i });

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '#');
    expect(screen.getByText('Karol')).toBeInTheDocument();
  });
});
