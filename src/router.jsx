import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { loginAction } from './api/login';
import { registerAction } from './api/register';
const routesConfig = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: '/chat',
    element: <ChatPage />,
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
