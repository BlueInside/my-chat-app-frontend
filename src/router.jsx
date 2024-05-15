import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import { registerAction } from './api/register';
import AboutPage from './pages/AboutPage';
import { usersLoader } from './api/users';
import ProtectedRoute from './components/ProtectedRoute';
import ConversationView from './components/ConversationView';
import { conversationDetailLoader } from './api/conversation';
import axios from 'axios';

const routesConfig = [
  {
    path: '/',
    element: <HomePage />,
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
    children: [
      {
        path: '/chat/:conversationId',
        element: <ConversationView />,
        loader: conversationDetailLoader,
      },
    ],
  },
  {
    path: '/messages',
    action: async ({ request }) => {
      const formData = await request.formData();
      const response = await axios.post(
        'http://localhost:3000/messages',
        formData
      );
      return response.json(); // You should return the updated conversation or a success message
    },
  },
  {
    path: '/profile/:userId',
    element: <ProfilePage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];

export default routesConfig;
