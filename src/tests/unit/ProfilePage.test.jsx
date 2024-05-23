import { render } from '@testing-library/react';
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
});
