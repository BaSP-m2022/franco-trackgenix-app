import React from 'react';
import logo1 from './images/logo-1.png';
import logo2 from './images/logo-2.png';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div id="logo">
        <Link to={'/home'} className={styles.logo}>
          {/* <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo1.png`}
            alt="Rocket"
            className={styles.rocket}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo2.png`}
            alt="Radium"
            className={styles.radium}
          /> */}
          <img src={logo1} alt="Rocket" className={styles.rocket} />
          <img src={logo2} alt="Radium" className={styles.radium} />
        </Link>
      </div>
      <div id="title" className={styles.title}>
        TRACKGENIX
      </div>
    </header>
  );
};

export default Header;
