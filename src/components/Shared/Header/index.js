import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <header>
      <div id="logo">
        <div className={styles.logo}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo1.svg`}
            alt="Rocket"
            className={styles.rocket}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo2.svg`}
            alt="Radium"
            className={styles.radium}
          />
        </div>
      </div>
      <div id="title" className={styles.title}>
        TRACKGENIX
      </div>
    </header>
  );
};

export default Header;
