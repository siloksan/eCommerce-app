import { Link } from 'react-router-dom';

import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';
import Logo from 'components/Logo/Logo';
import NavBar from 'components/NavBar/NavBar';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <NavBar />
      <UserAuthenticationPanel />
    </header>
  );
}
