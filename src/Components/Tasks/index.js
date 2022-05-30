import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './tasks.module.css';
import Modal from './Modal';

function Tasks() {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idTask, setIdTask] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const responseJson = await response.json();
      setList(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const deleteItem = (id) => {
    setIsOpen(true);
    setIdTask(id);
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <List list={list} setList={setList} deleteItem={deleteItem} />
      </div>
      <a href="/task" className={styles.button}>
        Add new task
      </a>
      {isOpen && <Modal setIsOpen={setIsOpen} setList={setList} list={list} id={idTask} />}
    </section>
  );
}

export default Tasks;
