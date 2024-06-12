import { Link } from 'react-router-dom';

import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  text: string;
  link: string;
  accent: boolean;
}

function LinkButton({ text, link, accent }: LinkButtonProps) {
  if (accent) {
    return (
      <Link to={link} className={`${styles.button} ${styles.buttonAccent}`}>
        {text}
      </Link>
    );
  }
  return (
    <Link to={link} className={styles.button}>
      {text}
    </Link>
  );
}

export default LinkButton;
