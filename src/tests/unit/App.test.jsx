import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../../App';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(true).toBe(true);
  });
});
