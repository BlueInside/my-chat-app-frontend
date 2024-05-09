import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import routesConfig from '../router';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../contexts/AuthContext';

// Setup axios mock
let mock = new MockAdapter(axios);
beforeEach(() => {
  mock.reset();
});

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

  it('handles login correctly with valid credentials', async () => {
    const user = userEvent.setup();
    const loginMock = vi.fn();

    mock.onPost('http://localhost:3000/authenticate/login').reply(200, {
      user: { username: 'fakeUser' },
      token: 'fake-token',
    });

    render(
      <AuthContext.Provider
        value={{
          login: loginMock,
        }}
      >
        <RouterProvider router={router}>
          <LoginForm />
        </RouterProvider>
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'validUser');
    await user.type(passwordInput, 'validPass');

    await user.click(loginButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        user: { username: 'fakeUser' },
        token: 'fake-token',
      });
    });
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

  it('displays error message on invalid login', async () => {
    const user = userEvent.setup();
    mock.onPost('http://localhost:3000/authenticate/login').reply(400);
    render(
      <RouterProvider router={router}>
        <LoginForm />
      </RouterProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpass');

    await user.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(/incorrect username or password/i)
      ).toBeInTheDocument();
    });
  });
});
