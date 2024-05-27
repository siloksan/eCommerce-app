import classes from './ButtonSubmit.module.scss';

interface Props {
  label: string;
}

function ButtonSubmit({ label }: Props) {
  return (
    <button type="submit" className={`${classes.button} ${classes.buttonAccent}`}>
      {label}
    </button>
  );
}

export default ButtonSubmit;
