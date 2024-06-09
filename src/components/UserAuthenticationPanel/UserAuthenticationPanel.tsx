import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useApiContext from 'context/context';
import LinkButton from 'components/LinkButton/LinkButton';
import Button from 'shared/Button/Button';

import styles from './UserAuthenticationPanel.module.scss';

function UserAuthenticationPanel() {
  const { customerService } = useApiContext();
  const navigate = useNavigate();
  const [userAuthorized, setUserAuthorized] = useState(false);

  useEffect(() => {
    if (customerService.userAuthorized) {
      setUserAuthorized(true);
    }
  }, [customerService.userAuthorized]);

  const logOut = (): void => {
    customerService.logOut();
    navigate('/');
    setUserAuthorized(false);
  };

  return (
    <div className={styles.panel}>
      {!userAuthorized && (
        <>
          <LinkButton text="Log in" link="login" accent={false} />
          <LinkButton text="Sign in" link="register" accent />
        </>
      )}
      <Button label="Log out" handleClick={logOut} />
    </div>
  );
}

export default UserAuthenticationPanel;
