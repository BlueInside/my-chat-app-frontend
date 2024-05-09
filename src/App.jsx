import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import routesConfig from './router.jsx';

function App() {
  const router = createBrowserRouter(routesConfig);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
