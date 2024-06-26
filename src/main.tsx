import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ApiContext, dataContext } from 'context/context';
import Layout from 'layout/Layout';
import Main from 'pages/Main/Main';
import LoginForm from 'pages/Login/Login';
import RegistrationPage from 'pages/Registration/Registration';
import Catalog from 'pages/Catalog/Catalog';
import NotFoundPage from 'pages/NotFound/NotFound';
import ProductPage from 'pages/Product/Product';
import UserProfile from 'pages/UserProfile/UserProfile';
import AboutUs from 'pages/AboutUs/AboutUs';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import Cart from 'pages/Cart/Cart';

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
      {
        path: 'product/:productKey',
        element: <ProductPage />,
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'about_us',
        element: <AboutUs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApiContext.Provider value={dataContext}>
    <RouterProvider router={router} />
    <ToastContainer />
  </ApiContext.Provider>
);
