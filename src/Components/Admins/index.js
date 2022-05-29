import styles from './admins.module.css';
import { useState, useEffect } from 'react';
import List from './List/AdminsList';

const Admins = () => {
  // const URL = `${process.env.PORT}/admins`;
  // const URL = 'http://localhost:4000/admins';
  const [adminsList, setAdminsList] = useState([]);

  // API request to get admins
  useEffect(async () => {
    try {
      const response = await fetch(URL, { method: 'GET' });
      const data = await response.json();
      setAdminsList(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //API request to delete admins
  const deleteAdmin = (_id) => {
    setAdminsList([...adminsList.filter((adminsItem) => adminsItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <List adminsList={adminsList} setAdminList={setAdminsList} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
