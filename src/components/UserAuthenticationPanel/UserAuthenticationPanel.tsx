import LinkButton from 'components/LinkButton/LinkButton';
import Button from 'shared/Button/Button';

import styles from './UserAuthenticationPanel.module.scss';

interface Props {
  userAuthorized: boolean;
  logOut: () => void;
}

function UserAuthenticationPanel({ userAuthorized, logOut }: Props) {
  return (
    <div className={styles.panel}>
      {!userAuthorized && (
        <>
          <LinkButton text="Log in" link="login" accent={false} additionalClass={styles.button} />
          <LinkButton text="Sign in" link="register" accent additionalClass={styles.button} />
        </>
      )}
      {userAuthorized && <Button label="Log out" handleClick={logOut} additionalClass={styles.button} />}
    </div>
  );
}

export default UserAuthenticationPanel;
