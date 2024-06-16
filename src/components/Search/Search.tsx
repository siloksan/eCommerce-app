import classes from './Search.module.scss';

interface SearchProps {
  searchHandler: React.ChangeEventHandler<HTMLInputElement>;
}

function Search({ searchHandler }: SearchProps) {
  return (
    <div className={classes.search}>
      <input type="search" className={classes.search__input} onChange={searchHandler} placeholder="search" />
    </div>
  );
}

export default Search;
