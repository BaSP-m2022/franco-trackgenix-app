import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './tasks.module.css';

function Tasks() {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const responseJson = await response.json();
      setList(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const deleteItem = async (id) => {
    let confirm = window.confirm('Do you wish to delete the task?');
    if (confirm) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
          method: 'DELETE'
        });
        const result = list.filter((task) => task._id !== id);
        setList(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.h2_task}>Tasks</h2>
      <div>
        <List list={list} setList={setList} deleteItem={deleteItem} />
      </div>
      <div className={styles.btn_div}>
        <a href="/tasks/form" className={styles.button}>
          &#10010; Add new task
        </a>
      </div>
    </section>
  );
}

export default Tasks;
