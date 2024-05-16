import { describe, expect, it } from 'vitest';
import Footer from '../../components/Footer';
import { render, screen, within } from '@testing-library/react';

describe('Footer component', () => {
  it('Render footer with github link and github icon', () => {
    render(<Footer></Footer>);

    const footer = screen.getByRole('contentinfo');
    const githubLink = within(footer).getByRole('link');
    const footerText = within(footer).getByText(/2023 Karol Pulawski/i);

    expect(footer).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
  });
});
