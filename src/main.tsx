import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from 'layout/Layout';
import Main from 'pages/Main/Main';
import LoginForm from 'pages/Login/Login';
import RegistrationPage from 'pages/Registration/Registration';
import NotFoundPage from 'pages/NotFound/NotFound';
import UserProfile from 'pages/UserProfile/UserProfile';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import { ApiContext } from 'context/context';
import { client } from 'api/client/client';
import { customerService } from 'api/services/CustomerService';

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
        path: 'user-profile',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApiContext.Provider value={{ client, customerService }}>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  </ApiContext.Provider>
);
