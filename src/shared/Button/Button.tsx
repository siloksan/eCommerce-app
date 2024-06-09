import classes from './Button.module.scss';

interface Props {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  handleClick?: () => void;
  accent?: boolean;
}

function Button({ label, type = 'button', accent = true, handleClick }: Props) {
  let className = classes.button;
  if (accent) {
    className += `  ${classes.buttonAccent}`;
  }

  return (
    <button type={type} className={className} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
