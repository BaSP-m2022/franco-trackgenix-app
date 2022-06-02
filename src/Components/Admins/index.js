import styles from './admins.module.css';
import { useState, useEffect } from 'react';
import List from './List/AdminsList';

const Admins = () => {
  const URL = `${process.env.REACT_APP_API_URL}/admins`;
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(URL, { method: 'GET' });
      const responseJson = await response.json();
      setList(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async (_id) => {
    const response = await fetch(`${URL}/${_id}`, { method: 'DELETE' });
    const responseJson = await response.json();
    if (responseJson.error) {
      alert('error');
    } else {
      setList([...list.filter((adminsItem) => adminsItem._id !== _id)]);
      alert('delete successfully');
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a className={styles.add} href="/admins/form">
        &#10010; Add New Admin
      </a>
      <List list={list} setList={setList} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
