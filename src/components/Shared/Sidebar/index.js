import React from 'react';
import NavLinks from '../NavLink';
import styles from './sidebar.module.css';

function Sidebar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <h2 className={styles.menu}>Menu</h2>
      </div>
      <div>
        <ul className={styles.routes}>
          <NavLinks />
          <li>
            <p className={styles.contact}> Contact Us</p>
          </li>
          <li>
            <p>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" />
              </svg>
              contact@trackgenix.com
            </p>
          </li>
          <li>
            <p>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
              </svg>
              +54-3410303456
            </p>
          </li>
          <li>
            <p>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
              </svg>
              1234 Somewhere Road
            </p>
            <p className={styles.dir}>#8254 Nashville, TN</p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
