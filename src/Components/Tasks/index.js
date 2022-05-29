import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './tasks.module.css';

function Tasks() {
  const [list, setList] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      console.log(data);
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <List list={list} setList={setList} />
      </div>
    </section>
  );
}

export default Tasks;
