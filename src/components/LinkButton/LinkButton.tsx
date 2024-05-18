import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  text: string;
  link: string;
  accent: boolean;
}

function LinkButton({ text, link, accent }: LinkButtonProps) {
  if (accent) {
    return (
      <a className={`${styles.button} ${styles.buttonAccent}`} href={link}>
        {text}
      </a>
    );
  }
  return (
    <a className={styles.button} href={link}>
      {text}
    </a>
  );
}

export default LinkButton;
