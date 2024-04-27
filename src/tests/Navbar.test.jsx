import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('contains navigation element', () => {
    render(<Navbar />);
    const navigationElement = screen.getByRole('navigation');
    expect(navigationElement).toBeInTheDocument();
  });

  it('renders a logo', () => {
    render(<Navbar />);
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('contains navigation links with correct text', () => {
    render(<Navbar />);
    const expectedLinks = ['Home', 'Features', 'About'];
    expectedLinks.forEach((linkText) => {
      const link = screen.getByText(linkText);
      expect(link).toBeInTheDocument();
    });
  });
});
