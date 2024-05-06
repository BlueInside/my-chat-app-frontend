import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routesConfig from '../router';
import LoginForm from '../components/LoginForm';

describe('LoginForm component', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/login'],
  });

  it('Render form with username and password fields', () => {
    render(
      <RouterProvider router={router}>
        <LoginForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Form inputs works correctly', async () => {
    const user = userEvent.setup();

    render(
      <RouterProvider router={router}>
        <LoginForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, 'testUser');
    await user.type(passwordInput, 'securePassword');

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('securePassword');
  });
});