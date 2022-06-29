import React from 'react';
import styles from './NavLink.module.css';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <ul className={styles.routes}>
      <li className={styles.items}>
        <NavLink to={'home'} className={styles.links}>
          Home
        </NavLink>
      </li>
      <li className={styles.items}>
        <NavLink to={'/admins'} className={styles.links}>
          Admins
        </NavLink>
      </li>
      <li className={styles.items}>
        <NavLink to={'/super-admins'} className={styles.links}>
          Super admins
        </NavLink>
      </li>
      <li className={styles.items}>
        <NavLink to={'/employees'} className={styles.links}>
          Employees
        </NavLink>
      </li>
      <li className={styles.items}>
        <NavLink to={'/projects'} className={styles.links}>
          Projects
        </NavLink>
      </li>
      <li className={styles.items}>
        <NavLink to={'/time-sheets'} className={styles.links}>
          Timesheets
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
