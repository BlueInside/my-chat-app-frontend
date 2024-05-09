import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import { registerAction } from './api/register';
import AboutPage from './pages/AboutPage';
import { conversationLoader } from './api/conversation';

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
    element: <ChatPage />,
    loader: conversationLoader,
  },
  {
    path: '/chat/:conversationId',
    element: <ChatPage />,
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
