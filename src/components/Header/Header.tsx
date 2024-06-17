import { Link, useNavigate } from 'react-router-dom';

import UserAuthenticationPanel from 'components/UserAuthenticationPanel/UserAuthenticationPanel';
import Logo from 'components/Logo/Logo';
import NavBar from 'components/NavBar/NavBar';
import Button from 'shared/Button/Button';
import SvgComponent from 'shared/SvgComponent/SvgComponent';
import basketSvg from 'assets/icons/basket.svg';
import userSvg from 'assets/icons/user.svg';

import { useCartContext } from 'context/cart-context';
import { useEffect, useState } from 'react';
import useApiContext from 'context/context';
import styles from './Header.module.scss';

export default function Header() {
  const { quantity, setCartState } = useCartContext();

  const { customerService, cartService } = useApiContext();
  const navigate = useNavigate();
  const [userAuthorized, setUserAuthorized] = useState(false);

  useEffect(() => {
    if (customerService.userAuthorized) {
      setUserAuthorized(true);
    }
  }, [customerService.userAuthorized]);

  const logOut = (): void => {
    customerService.logOut();
    cartService.clearCartData();
    setCartState(null);
    navigate('/');
    setUserAuthorized(false);
  };

  const basketImg = <SvgComponent svgPath={basketSvg} alt="user icon" style={{ maxHeight: '50px' }} />;
  const userImg = <SvgComponent svgPath={userSvg} alt="basket icon" style={{ maxHeight: '50px' }} />;
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <NavBar />
      {userAuthorized && (
        <Link to="/user-profile" className={styles.icon}>
          <Button label={userImg} accent={false} />
        </Link>
      )}
      <Link to="/cart" className={styles.icon}>
        <Button label={basketImg} accent={false} />
        <span className={styles.quantity}>{quantity}</span>
      </Link>
      <UserAuthenticationPanel userAuthorized={userAuthorized} logOut={logOut} />
    </header>
  );
}
