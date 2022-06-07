import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Table from '../Shared/Table';

function Tasks() {
  const [dataTable, setDataTable] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const responseJson = await response.json();
      console.log(responseJson.data);
      setDataTable(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      const result = dataTable.filter((task) => task._id !== id);
      setDataTable(result);
    } catch (error) {
      console.log(error);
    }
  };

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'Description', value: 'description' },
    { heading: 'Worked Hours', value: 'workedHours' },
    { heading: 'Project', value: 'projectId.name' },
    { heading: 'Date', value: 'date' }
  ];

  const entity = 'tasks';

  return (
    <section className={styles.container}>
      <h2 className={styles.h2_task}>Tasks</h2>
      <div>
        <Table data={dataTable} column={column} deleteItem={deleteItem} entity={entity} />
      </div>
      <div className={styles.btn_div}></div>
    </section>
  );
}

export default Tasks;
