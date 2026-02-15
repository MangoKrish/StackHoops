import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddGame from './pages/AddGame.jsx';
import EditGame from './pages/EditGame.jsx';
import GamesList from './pages/GamesList.jsx';
import GameDetail from './pages/GameDetail.jsx';
import Analytics from './pages/Analytics.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'add', element: <AddGame /> },
      { path: 'edit/:id', element: <EditGame /> },
      { path: 'games', element: <GamesList /> },
      { path: 'games/:id', element: <GameDetail /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
