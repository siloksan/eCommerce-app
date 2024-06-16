import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import { CartProvider } from 'context/cart-context';
import styles from './Layout.module.scss';

function Layout() {
  return (
    <CartProvider>
      <>
        <Header />
        <main className={styles.container}>
          <Outlet />
        </main>
        <Footer />
      </>
    </CartProvider>
  );
}

export default Layout;
