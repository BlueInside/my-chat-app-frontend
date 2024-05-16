import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegistrationPrompt from '../../components/RegistrationPrompt';

describe('RegistrationPrompt component', () => {
  it('Renders RegistrationPrompt correctly', () => {
    render(
      <MemoryRouter>
        <RegistrationPrompt />
      </MemoryRouter>
    );

    const paraText = screen.getByText(/not having account yet/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    expect(paraText).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
