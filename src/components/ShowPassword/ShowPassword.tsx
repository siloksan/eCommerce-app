import eyeHideIcon from '../../assets/icons/eye-hide.svg';
import eyeShowIcon from '../../assets/icons/eye-show.svg';
import classes from './ShowPasswordButton.module.scss';

interface ShowPasswordButtonProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

function ShowPasswordButton({ showPassword, togglePasswordVisibility }: ShowPasswordButtonProps) {
  return (
    <button type="button" onClick={togglePasswordVisibility} className={classes.togglePassword}>
      <img
        src={showPassword ? eyeShowIcon : eyeHideIcon}
        alt={showPassword ? 'Hide password' : 'Show password'}
        className={classes.icon}
      />
    </button>
  );
};

export default ShowPasswordButton;
