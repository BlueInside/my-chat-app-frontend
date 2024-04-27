import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { name: /hello world/i });
    expect(headerElement).toBeInTheDocument();
  });
});
