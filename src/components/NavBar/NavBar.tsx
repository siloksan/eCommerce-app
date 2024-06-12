import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'shared/Button/Button';
import styles from './NavBar.module.scss';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.dropdown_btn}>
        <Button label="☰" accent={false} handleClick={toggleDropdown} />
      </div>
      <ul className={`${styles.list} ${dropdownOpen ? styles.open : ''}`}>
        <li className={styles.item} onClick={toggleDropdown}>
          <Link to="/catalog" className={styles.link}>
            Catalog
          </Link>
        </li>
        <li className={styles.item} onClick={toggleDropdown}>
          <Link to="/about_us" className={styles.link}>
            About Us
          </Link>
        </li>
        <li className={styles.item} onClick={toggleDropdown}>
          <Link to="/" className={styles.link}>
            Main
          </Link>
        </li>
      </ul>
    </nav>
  );
}
