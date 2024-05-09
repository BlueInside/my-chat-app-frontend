import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

describe('ProtectedRoute component', () => {
  const TestComponent = () => <div>Protected Content</div>;
  let router;

  beforeEach(() => {
    router = createMemoryRouter(
      [
        {
          path: '/login',
          element: <div>Login Page</div>,
        },
        {
          path: '/protected',
          element: (
            <ProtectedRoute>
              <TestComponent />
            </ProtectedRoute>
          ),
        },
      ],
      { initialEntries: ['/protected'] }
    );
  });

  it('Should redirect to login if not authenticated', async () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('Should display display TestComponent if user is authenticated', async () => {
    render(
      <AuthContext.Provider
        value={{ user: { username: 'karol' }, token: 'fakeToken' }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
