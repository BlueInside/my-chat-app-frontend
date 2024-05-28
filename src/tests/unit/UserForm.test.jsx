import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserForm from '../../components/UserForm';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockUser = {
  _id: 'user1',
  username: 'Karol',
  fullName: 'Karol Pulawski',
  bio: 'My very interesting bio',
  avatarUrl: '#',
  dateOfBirth: '1997 05 18',
};

let router = createMemoryRouter(
  [
    {
      path: '/',
      element: <UserForm user={mockUser} />,
    },
  ],
  { initialEntries: ['/'] }
);

describe('UserForm component', () => {
  it('Has correct form inputs', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Choose a profile picture')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your date of birth')
    ).toBeInTheDocument();
  });

  it('Displays correct initial values', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText('Full name').value).toBe(mockUser.fullName);
    expect(screen.getByLabelText('Bio').value).toBe(mockUser.bio);
  });

  it('Handles form submission correctly', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.clear(screen.getByLabelText('Full name'));
    await user.type(screen.getByLabelText('Full name'), 'New name');

    await user.clear(screen.getByLabelText('Bio'));
    await user.type(screen.getByLabelText('Bio'), 'New Bio');

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText('Avatar'), file);

    expect(screen.getByLabelText('Full name').value).toBe('New name');
    expect(screen.getByLabelText('Bio').value).toBe('New Bio');
    expect(screen.getByLabelText('Avatar').files[0]).toEqual(file);
  });

  it('Should not display error message when an valid image type is selected', async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);
    const fileInput = screen.getByLabelText('Avatar');
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    await user.upload(fileInput, file);

    const fileInputError = screen.queryByText(
      'Unsupported file type. Please select an image (JPEG, PNG, GIF, WEBP).'
    );

    expect(fileInput.files[0].name).toBe('test.png');
    expect(fileInput.files[0].type).toBe('image/png');
    expect(fileInputError).not.toBeInTheDocument();
  });

  it('Should display error message when image type is invalid', async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const fileInput = screen.getByLabelText('Avatar');
    const unsupportedFile = new File(['content'], 'virus.exe', {
      type: 'application/x-msdownload',
    });

    await user.upload(fileInput, unsupportedFile);

    const fileInputError = screen.getByText(
      'Unsupported file type. Please select an image (JPEG, PNG, GIF, WEBP).'
    );

    expect(fileInputError).toBeInTheDocument();
  });
});
