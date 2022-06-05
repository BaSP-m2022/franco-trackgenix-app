import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
        <ul className={styles.routes}>
          <li>
            <Link to={'/admins'}>admins</Link>
          </li>
          <li>
            <Link to={'/super-admins'}>super admins</Link>
          </li>
          <li>
            <Link to={'/employees'}>employees</Link>
          </li>
          <li>
            <Link to={'/projects'}>projects</Link>
          </li>
          <li>
            <Link to={'/time-sheets'}>timesheets</Link>
          </li>
          <li>
            <Link to={'/tasks'}>tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
