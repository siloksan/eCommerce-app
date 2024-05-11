import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import styles from './Main.module.scss';

function Main() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1>Content</h1>
      </main>
      <Footer />
    </>
  );
}

export default Main;
