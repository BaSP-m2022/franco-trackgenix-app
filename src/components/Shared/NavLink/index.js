import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './NavLink.module.css';

const NavLinks = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [role, setRole] = useState('');
  useEffect(() => {
    setRole(JSON.parse(sessionStorage.getItem('loggedUser'))?.role);
  }, [authenticated]);

  return (
    <div>
      {(() => {
        switch (role) {
          case 'EMPLOYEE':
            return (
              <ul className={styles.routes}>
                <li className={styles.items}>
                  <NavLink to={'/employee/home'} className={styles.links}>
                    Home
                  </NavLink>
                </li>
                <li className={styles.items}>
                  <NavLink to={'/time-sheets'} className={styles.links}>
                    Timesheets
                  </NavLink>
                </li>
              </ul>
            );
          case 'ADMIN':
            return (
              <ul className={styles.routes}>
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
          case 'SUPERADMIN':
            return (
              <ul className={styles.routes}>
                <li className={styles.items}>
                  <NavLink to={'home'} className={styles.links}>
                    Home
                  </NavLink>
                </li>
              </ul>
            );
          default:
            return (
              <ul className={styles.routes}>
                <li className={styles.items}>
                  <NavLink to={'home'} className={styles.links}>
                    Home
                  </NavLink>
                </li>
              </ul>
            );
        }
      })()}
    </div>
  );
};

export default NavLinks;
