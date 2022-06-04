import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import List from './List/TimeSheetsList.jsx';

const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const URL = `${process.env.REACT_APP_API_URL}/time-sheets`;

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(URL, {
        method: 'GET'
      });
      const responseJson = await response.json();
      setList(responseJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTimeSheet = async (_id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, { method: 'DELETE' });
    setList([...list.filter((timeSheet) => timeSheet._id !== _id)]);
  };

  if (loading) {
    return <p>Data is loading...</p>;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>TimeSheets</h2>
      <List list={list} setList={setList} deleteTimeSheet={deleteTimeSheet} />
      <a className={styles.btn} href="/time-sheets/form">
        Add New Time Sheet
      </a>
    </section>
  );
};

export default TimeSheets;
