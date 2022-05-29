import styles from './admins.module.css';
import { useState, useEffect } from 'react';
import List from './List/AdminsList';

const Admins = () => {
  const URL = `${process.env.REACT_APP_API_URL}/admins`;
  const [list, setList] = useState([]);

  // API request to get admins
  useEffect(async () => {
    try {
      const response = await fetch(URL, { method: 'GET' });
      const data = await response.json();
      setList(data.data);
      console.log('data', data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //API request to delete admins
  const deleteAdmin = async (_id) => {
    await fetch(`${URL} / ${_id}`, { method: 'GET' });
    setList([...list.filter((adminsItem) => adminsItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <button>&#10010; Add New Admin</button>
      <List list={list} setList={setList} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
