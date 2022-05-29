import { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import styles from './super-admins.module.css';
import List from './List/List';

dotenv.config();

function SuperAdmins() {
  const [listSuperAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const data = await response.json();
      setSuperAdmins(data.data);
      console.log('Data', data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (_id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/${_id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...listSuperAdmins.filter((admin) => admin._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <button>&#10010; Add Super Admin</button>
      <List list={listSuperAdmins} setList={setSuperAdmins} deleteSuperAdmin={deleteSuperAdmin} />
    </section>
  );
}

export default SuperAdmins;
