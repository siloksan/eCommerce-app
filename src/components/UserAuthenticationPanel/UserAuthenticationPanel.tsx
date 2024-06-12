import { useNavigate } from 'react-router-dom';

import useApiContext from 'context/context';
import LinkButton from 'components/LinkButton/LinkButton';
import Button from 'shared/Button/Button';

import styles from './UserAuthenticationPanel.module.scss';

function UserAuthenticationPanel() {
  const { customerService } = useApiContext();
  const navigate = useNavigate();

  const logOut = (): void => {
    customerService.logOut();
    navigate('/');
  };

  return (
    <div className={styles.panel}>
      <LinkButton text="Log in" link="login" accent={false} />
      <LinkButton text="Sign in" link="register" accent />
      <Button label="Log out" handleClick={logOut} />
    </div>
  );
}

export default UserAuthenticationPanel;
