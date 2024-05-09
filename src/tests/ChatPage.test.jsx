import { beforeEach, describe, expect, it } from 'vitest';
import ChatPage from '../pages/ChatPage';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('ChatPage component', () => {
  let router;

  beforeEach(() => {
    router = createMemoryRouter(
      [
        {
          path: '/chat',
          element: <ChatPage />,
        },
      ],
      { initialEntries: ['/chat'] }
    );
  });

  it('Should display list conversation list', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText('Search conversation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
