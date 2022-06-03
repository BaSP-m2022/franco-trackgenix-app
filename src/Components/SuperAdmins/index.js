import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import List from './List/List';

function SuperAdmins() {
  const [listSuperAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${_id}`, {
      method: 'DELETE'
    });
    const res = await response.json();
    if (res.data.error) {
      window.alert('there was an error');
    } else {
      setSuperAdmins([...listSuperAdmins.filter((admin) => admin._id !== _id)]);
      window.alert(res.message);
    }
  };

  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <a className={styles.btn} href={'/super-admins/form'}>
        &#10010; Add Super Admin
      </a>
      <List list={listSuperAdmins} setList={setSuperAdmins} deleteSuperAdmin={deleteSuperAdmin} />
    </section>
  );
}

export default SuperAdmins;
