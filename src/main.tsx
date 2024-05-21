import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from 'layout/Layout';
import Main from 'pages/Main/Main';
import LoginForm from 'pages/Login/Login';
import RegistrationPage from 'pages/Registration/Registration';
import NotFoundPage from 'pages/NotFound/NotFound';

import './styles/index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegistrationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
