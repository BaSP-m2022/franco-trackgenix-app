import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  // eslint-disable-next-line no-unused-vars
  const [superAdmins, saveSuperAdmins] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:4000/super-admins');
      const data = await response.json();
      console.log(data);
      saveSuperAdmins(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
    </section>
  );
}

export default SuperAdmins;
