import classes from './Button.module.scss';

interface Props {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  handleClick?: () => void;
}

function Button({ label, type = 'button', handleClick }: Props) {
  return (
    <button type={type} className={`${classes.button} ${classes.buttonAccent}`} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
