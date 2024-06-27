import classes from './Button.module.scss';

interface Props {
  label: string | JSX.Element;
  type?: 'submit' | 'reset' | 'button';
  handleClick?: () => void;
  accent?: boolean;
  additionalClass?: CSSModuleClasses[string];
}

function Button({ label, type = 'button', accent = true, additionalClass, handleClick }: Props) {
  let className = classes.button;
  if (accent) {
    className += ` ${classes.buttonAccent}`;
  }

  if (additionalClass) {
    className += ` ${additionalClass}`;
  }

  return (
    <button type={type} className={className} onClick={handleClick} data-testid="button">
      {label}
    </button>
  );
}

export default Button;
