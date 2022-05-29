import { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import styles from './super-admins.module.css';
import List from './List/List';

dotenv.config();

//const mongoURL = process.env.REACT_APP_API_URL;

function SuperAdmins() {
  const [listSuperAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:4000/super-admins');
      const data = await response.json();
      setSuperAdmins(data.data);
      console.log('Data', data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (_id) => {
    await fetch(`http://localhost:4000/super-admins/${_id}`, {
      method: 'DELETE'
    });
    setSuperAdmins([...listSuperAdmins.filter((admin) => admin._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <button className="add">&#10010; Add Super Admin</button>
      <List list={listSuperAdmins} setList={setSuperAdmins} deleteSuperAdmin={deleteSuperAdmin} />
    </section>
  );
}

export default SuperAdmins;
