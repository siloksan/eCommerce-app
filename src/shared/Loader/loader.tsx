import classes from './loader.module.scss';

function CustomLoader() {
  return (
    <div className={classes.cup}>
      <div className={classes.handle} />
    </div>
  );
}

export default CustomLoader;
