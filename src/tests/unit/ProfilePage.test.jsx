import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProfilePage from '../../pages/ProfilePage';

let router = createMemoryRouter(
  [
    {
      path: '/',
      element: <ProfilePage />,
    },
  ],
  { initialEntries: ['/'] }
);

describe('ProfilePage Component', async () => {
  it('Renders Profile page properly', () => {
    const { container } = render(<RouterProvider router={router} />);

    expect(container).toMatchSnapshot();
  });

  it('Has correct form inputs', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getAllByLabelText('Full name')).toBeInTheDocument();

    expect(screen.getAllByLabelText('Avatar')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Chose a profile picture')
    ).toBeInTheDocument();

    expect(screen.getAllByLabelText('Date of Birth')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your date of birth')
    ).toBeInTheDocument();
  });
});
