import LinkButton from 'components/LinkButton/LinkButton';
import styles from './UserAuthenticationPanel.module.scss';

function UserAuthenticationPanel() {
  return (
    <div className={styles.panel}>
      <LinkButton text="Log in" link="login" accent={false} />
      <LinkButton text="Sign in" link="register" accent />
    </div>
  );
}

export default UserAuthenticationPanel;
