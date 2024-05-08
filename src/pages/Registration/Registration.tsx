import RegistrationForm from 'components/RegistrationForm/RegistrationForm';
import classes from './Registration.module.scss';

export default function RegistrationPage() {
  return (
    <div className={classes.container}>
      <RegistrationForm />
    </div>
  );
}
