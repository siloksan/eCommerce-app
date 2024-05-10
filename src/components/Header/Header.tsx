import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Logo</h1>
      <UserAuthenticationPanel />
    </header>
  );
}
