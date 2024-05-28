import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import { registerAction } from './api/register';
import AboutPage from './pages/AboutPage';
import { editUserAction, userLoader, usersLoader } from './api/users';
import ProtectedRoute from './components/ProtectedRoute';
import ConversationView from './components/ConversationView';
import { conversationDetailLoader } from './api/conversation';
import { messageAction } from './api/message';
import EditProfilePage from './pages/EditProfilePage';
import ErrorElement from './components/ErrorElement';

const routesConfig = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/features',
    element: <FeaturesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
    loader: usersLoader,
    errorElement: <ErrorElement />,
    children: [
      {
        path: ':conversationId',
        element: <ConversationView />,
        loader: conversationDetailLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile/:profileId',
        element: <ProfilePage />,
        loader: userLoader,
      },
      {
        path: 'profile/:profileId/edit',
        element: <EditProfilePage />,
        loader: userLoader,
        action: editUserAction,
      },
    ],
  },
  {
    path: '/messages',
    action: messageAction,
  },

  {
    path: '/settings',
    element: <SettingsPage />,
  },
];

export default routesConfig;
