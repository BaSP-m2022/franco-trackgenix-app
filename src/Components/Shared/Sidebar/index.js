import React from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
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
  );
}

export default Sidebar;
