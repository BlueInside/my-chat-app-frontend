import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

describe('Header component', () => {
  it('Checks snapshot', () => {
    const { container } = render(
      <Router>
        <Header></Header>
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it('Renders the header with main, call to action and buttons to log in or register', () => {
    render(
      <Router>
        <Header></Header>
      </Router>
    );
    const header = screen.getByRole('banner');
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerButton = screen.getByRole('button', { name: /register/i });
    const actionHeading = within(header).getByRole('heading', {
      name: /Chat Without Boundaries/i,
    });

    expect(header).toBeInTheDocument();
    expect(actionHeading).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it(`Does not show login or register buttons when user is logged in`, () => {
    const mockUser = {
      id: '123',
      username: 'testUser',
      token: 'token',
    };

    render(
      <Router>
        <AuthContext.Provider value={{ user: mockUser, logout: vi.fn() }}>
          <Header></Header>
        </AuthContext.Provider>
      </Router>
    );
    const loginButton = screen.queryByRole('button', { name: /login/i });
    const registerButton = screen.queryByRole('button', { name: /register/i });
    const actionHeading = screen.queryByRole('heading', {
      name: /Chat Without Boundaries/i,
    });
    const userName = screen.getByText(/testUser/i);

    expect(actionHeading).not.toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
    expect(registerButton).not.toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  });
});
