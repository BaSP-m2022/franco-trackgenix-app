import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import { getEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const [data, setData] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  // const [loading, setLoading] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [search, setSearch] = useState();
  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'FirstName', value: 'firstName' },
    { heading: 'LastName', value: 'lastName' },
    { heading: 'Dni', value: 'dni' },
    { heading: 'Email', value: 'email' },
    { heading: 'DateOfBirth', value: 'dateOfBirth' }
  ];
  const entity = 'employees';

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);
  // const error = useSelector((state) => state.employees.error);

  // THE NEXT 3 LINES ARE FOR PAGE TO WORK CORRECTLY, THEN SHOULD DELETE WHEN CODING CORRECTLY
  if (data !== employees) {
    setData(employees);
  }

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const deleteItem = (_id) => {
    try {
      // setLoading(true);
      setIsOpen(true);
      setIdToDelete(_id);
      // setLoading(false);
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

  const setSearchQuery = (value) => {
    setSearch(value);
    setData(untouchedData.filter((employee) => employee._id.includes(value)));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <Modal modalTitle={'Delete employee'} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <p>Are you sure you want to delete this employee?</p>
        <div>
          <Button text="Yes" type="delete" handler={() => deleteEmployee(idToDelete)} />
          <Button text="No" handler={() => setIsOpen(false)} />
        </div>
      </Modal>
      <div className={styles.addEmployee}>
        <Button text="Add new employee" link={'/employees/form'} />
        <Search searchQuery={search} setSearchQuery={setSearchQuery} placeholder="Search by ID" />
      </div>
      {<Table data={employees} deleteItem={deleteItem} column={column} entity={entity} />}
    </section>
  );
};

export default Employees;
