import { Link } from 'react-router-dom';

import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';
import Logo from 'components/Logo/Logo';
import NavBar from 'components/NavBar/NavBar';
import Button from 'shared/Button/Button';
import SvgComponent from 'shared/SvgComponent/SvgComponent';
import basketSvg from 'assets/icons/basket.svg';

import styles from './Header.module.scss';

export default function Header() {
  const basketImg = <SvgComponent svgPath={basketSvg} alt="basket" style={{ maxHeight: '50px' }} />;
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <NavBar />
      <Link to="/cart" className={styles.cart}>
        <Button label={basketImg} accent={false} />
      </Link>
      <UserAuthenticationPanel />
    </header>
  );
}
