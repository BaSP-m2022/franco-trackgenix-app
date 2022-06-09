import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

const Employees = () => {
  const [data, setData] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  const [loading, setLoading] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [search, setSearch] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setData(data.data);
      setUntouchedData(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (_id) => {
    try {
      setLoading(true);
      setIsOpen(true);
      setIdToDelete(_id);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/employees/${idToDelete}`, {
        method: 'DELETE'
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
    setData(data.filter((employee) => employee._id !== idToDelete));
    setUntouchedData(untouchedData.filter((employee) => employee._id !== idToDelete));
  };

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'FirstName', value: 'firstName' },
    { heading: 'LastName', value: 'lastName' },
    { heading: 'Dni', value: 'dni' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' },
    { heading: 'DateOfBirth', value: 'dateOfBirth' }
  ];
  const entity = 'employees';

  const setSearchQuery = (value) => {
    setSearch(value);
    setData(untouchedData.filter((employee) => employee._id.includes(value)));
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      {loading ? (
        <div className={styles.loading}>
          <LoadingScreen />
        </div>
      ) : (
        ''
      )}
      <div className={styles.search}>
        <Search searchQuery={search} setSearchQuery={setSearchQuery} placeholder="Search by ID" />
      </div>
      <Modal modalTitle={'Delete employee'} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <p>Are you sure you want to delete this employee?</p>
        <div>
          <Button text="Yes" type="delete" handler={() => deleteEmployee(idToDelete)} />
          <Button text="No" handler={() => setIsOpen(false)} />
        </div>
      </Modal>
      <div className={styles.addEmployee}>
        <Button text=" + Add new employee" />
      </div>
      {<Table data={data} deleteItem={deleteItem} column={column} entity={entity} />}
    </section>
  );
};

export default Employees;
