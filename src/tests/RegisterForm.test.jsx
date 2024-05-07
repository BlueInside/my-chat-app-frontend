import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routesConfig from '../router';
import RegisterForm from '../components/RegisterForm';
import { act } from 'react';

describe('RegisterForm component', () => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ['/register'],
  });

  it('Render form with username and password fields', () => {
    render(
      <RouterProvider router={router}>
        <RegisterForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign-up/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Form inputs works correctly', async () => {
    const user = userEvent.setup();

    render(
      <RouterProvider router={router}>
        <RegisterForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, 'testUser');
    await user.type(passwordInput, 'securePassword');

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('securePassword');
  });

  it('displays error message on invalid login', async () => {
    const user = userEvent.setup();

    render(
      <RouterProvider router={router}>
        <RegisterForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /sign-up/i });

    await user.type(usernameInput, '123');
    await user.type(passwordInput, 'short');

    await act(async () => {
      await user.click(registerButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/username must be at least 5 characters long/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 8 characters long./i)
      ).toBeInTheDocument();
    });
  });
});
