import logo from 'assets/icons/logo.svg';
import styles from './Logo.module.scss';

function Logo() {
  return <img src={logo} alt="Coffee Lovers" className={styles.logo} />;
}

export default Logo;
