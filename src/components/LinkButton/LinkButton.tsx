import { Link } from 'react-router-dom';

import styles from './LinkButton.module.scss';

interface LinkButtonProps {
  text: string;
  link: string;
  accent: boolean;
  additionalClass?: CSSModuleClasses[string];
}

function LinkButton({ text, link, accent, additionalClass }: LinkButtonProps) {
  let className = styles.button;

  if (accent) {
    className += `  ${styles.buttonAccent}`;
  }

  if (additionalClass) {
    className += `  ${additionalClass}`;
  }

  return (
    <Link to={link} className={className}>
      {text}
    </Link>
  );
}

export default LinkButton;
