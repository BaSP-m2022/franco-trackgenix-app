import React from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <ul className={styles.routes}>
          <div>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/admins'}>Admins</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/super-admins'}>Super admins</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/employees'}>Employees</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/projects'}>Projects</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/time-sheets'}>Timesheets</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to={'/tasks'}>Tasks</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
