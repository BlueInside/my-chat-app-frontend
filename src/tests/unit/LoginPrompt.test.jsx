import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPrompt from '../../components/LoginPrompt';

describe('RegistrationPrompt component', () => {
  it('Renders RegistrationPrompt correctly', () => {
    render(
      <MemoryRouter>
        <LoginPrompt />
      </MemoryRouter>
    );

    const paraText = screen.getByText(/Already a member/i);
    const registerButton = screen.getByRole('button', { name: /login/i });

    expect(paraText).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
