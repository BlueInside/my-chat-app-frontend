import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routesConfig from './router';

const router = createBrowserRouter(routesConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
