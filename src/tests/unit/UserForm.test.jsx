import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserForm from '../../components/UserForm';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

let router = createMemoryRouter(
  [
    {
      path: '/',
      element: <UserForm />,
    },
  ],
  { initialEntries: ['/'] }
);

describe('UserForm component', () => {
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
