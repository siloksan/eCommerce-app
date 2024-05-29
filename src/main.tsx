import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from 'layout/Layout';
import Main from 'pages/Main/Main';
import LoginForm from 'pages/Login/Login';
import RegistrationPage from 'pages/Registration/Registration';
import Catalog from 'pages/Catalog/Catalog';
import NotFoundPage from 'pages/NotFound/NotFound';

import 'react-toastify/dist/ReactToastify.css';
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
      {
        path: 'catalog',
        element: <Catalog />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
