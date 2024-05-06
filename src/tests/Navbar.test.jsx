import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('contains navigation element', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const navigationElement = screen.getByRole('navigation');
    expect(navigationElement).toBeInTheDocument();
  });

  it('renders a logo', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('contains navigation links with correct text', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const expectedLinks = ['Home', 'Features', 'About'];
    expectedLinks.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });
  });
});
