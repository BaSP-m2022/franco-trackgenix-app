import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import Search from '../Shared/Search-bar';

function Tasks() {
  const [dataTable, setDataTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [untouchedData, setUntouchedData] = useState([]);

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const responseJson = await response.json();
      console.log(responseJson.data);
      setDataTable(responseJson.data);
      setUntouchedData(responseJson.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = (id) => {
    setSearchQuery(id);
    const result = untouchedData.filter((task) => task._id.includes(id));
    setDataTable(result);
  };

  const handleDeleteTask = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      const result = dataTable.filter((task) => task._id !== id);
      setDataTable(result);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section className={styles.containerTask}>
      <Modal modalTitle={'Delete Task'} isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
        <p>Do you wish to eliminate the task?</p>
        <div>
          <Button text="DELETE" type="delete" handler={() => deleteItem(deleteId)} />
          <Button text="CANCEL" handler={() => setIsOpen(!isOpen)} />
        </div>
      </Modal>
      <h2 className={styles.h2Task}>Tasks</h2>
      <div className={styles.search}>
        <Search searchQuery={searchQuery} setSearchQuery={search} placeholder="Search by name" />
      </div>
      <div className={styles.btnTask}>
        <Button text={'Add Task'} link={'/tasks/form'} />
      </div>
      <div>
        <Table data={dataTable} column={column} deleteItem={handleDeleteTask} entity={entity} />
      </div>
    </section>
  );
}

export default Tasks;
