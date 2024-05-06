import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
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
});
