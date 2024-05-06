import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
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

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
