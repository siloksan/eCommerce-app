import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { client } from 'api/client/client';
import { customerService } from 'api/services/CustomerService';
import { ApiContext } from 'context/context';
import Layout from 'layout/Layout';
import Main from 'pages/Main/Main';
import LoginForm from 'pages/Login/Login';
import RegistrationPage from 'pages/Registration/Registration';
import NotFoundPage from 'pages/NotFound/NotFound';
import ProductPage from 'pages/Product/Product';

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
        path: 'product',
        element: <ProductPage />,
      },
    ],
  },
]);

const data = { client, customerService };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApiContext.Provider value={data}>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  </ApiContext.Provider>
);
