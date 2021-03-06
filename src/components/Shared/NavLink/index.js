import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './NavLink.module.css';
import { setIsMenuOpen } from 'redux/menu/actions';

const NavLinks = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const projects = useSelector((state) => state.projects.list);
  const [role, setRole] = useState('');
  const [isPm, setIsPm] = useState(false);

  useEffect(() => {
    setRole(JSON.parse(sessionStorage.getItem('loggedUser'))?.role);
  }, [authenticated]);

  useEffect(() => {
    const role = JSON.parse(sessionStorage.getItem('loggedUser'))?.role;
    const idEmployee = JSON.parse(sessionStorage.getItem('loggedUser'))?._id;
    if (role === 'EMPLOYEE') {
      if (
        projects.find((project) =>
          project.employees.map((employee) => {
            if (employee.employeeId._id === idEmployee && employee.role === 'PM') return true;
          })
        )
      ) {
        sessionStorage.setItem('isPM', true);
        setIsPm(true);
      }
    }
  }, [projects]);

  return (
    <div className={styles.routesContainer}>
      {(() => {
        switch (role) {
          case 'EMPLOYEE':
            return (
              <ul className={styles.routes}>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'/employee/home'} className={styles.links}>
                    Home
                  </NavLink>
                </li>
                {isPm && (
                  <li
                    className={styles.items}
                    onClick={() => {
                      dispatch(setIsMenuOpen(false));
                    }}
                  >
                    <NavLink to={'/projects'} className={styles.links}>
                      Projects
                    </NavLink>
                  </li>
                )}
                {isPm && (
                  <li
                    className={styles.items}
                    onClick={() => {
                      dispatch(setIsMenuOpen(false));
                    }}
                  >
                    <NavLink to={'/employees/pm/timesheet'} className={styles.links}>
                      Projects Timesheets
                    </NavLink>
                  </li>
                )}
              </ul>
            );
          case 'ADMIN':
            return (
              <ul className={styles.routes}>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'/employees'} className={styles.links}>
                    Employees
                  </NavLink>
                </li>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'/projects'} className={styles.links}>
                    Projects
                  </NavLink>
                </li>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'/time-sheets'} className={styles.links}>
                    Timesheets
                  </NavLink>
                </li>
              </ul>
            );
          case 'SUPER-ADMIN':
            return (
              <ul className={styles.routes}>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'/admins'} className={styles.links}>
                    Admins
                  </NavLink>
                </li>
              </ul>
            );
          default:
            return (
              <ul className={styles.routes}>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'home'} className={styles.links}>
                    Home
                  </NavLink>
                </li>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'login'} className={styles.links}>
                    Login
                  </NavLink>
                </li>
                <li
                  className={styles.items}
                  onClick={() => {
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  <NavLink to={'signup'} className={styles.links}>
                    Sign Up
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
