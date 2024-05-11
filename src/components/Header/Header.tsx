import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';
import Logo from 'components/Logo/Logo';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <UserAuthenticationPanel />
    </header>
  );
}
