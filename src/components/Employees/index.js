import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import { getEmployees, deleteEmployees } from '../../redux/employees/thunks';
import { setEmployee } from '../../redux/employees/actions';

const Employees = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(employees);

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'FirstName', value: 'firstName' },
    { heading: 'LastName', value: 'lastName' },
    { heading: 'Dni', value: 'dni' },
    { heading: 'Email', value: 'email' },
    { heading: 'DateOfBirth', value: 'dateOfBirth' }
  ];

  const handleSetEmployee = (id) => {
    dispatch(setEmployee(id));
    history.push('/employees/form');
  };

  const buttonDelete = (id) => {
    setIdToDelete(id);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getEmployees());
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const deleteEmployee = (employee) => {
    dispatch(deleteEmployees(employee));
    setIsOpen(false);
  };

  const setSearchQuery = (value) => {
    setSearch(value);
    setFilteredList(employees.filter((employee) => employee._id.includes(search)));
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
      <Modal modalTitle={'Employees'} isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <p>{error ? error : 'Are you sure you want to delete an employee?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={() => setIsOpen(false)} />
            </div>
          ) : (
            <div>
              <Button text="Yes" type="delete" handler={() => deleteEmployee(idToDelete)} />
              <Button text="No" handler={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </Modal>
      <div className={styles.addEmployee}>
        <Button text="Add new employee" link={'/employees/form'} />
        <Search searchQuery={search} setSearchQuery={setSearchQuery} placeholder="Search by ID" />
      </div>
      {
        <Table
          data={search.length ? filteredList : employees}
          deleteItem={buttonDelete}
          column={column}
          editItem={handleSetEmployee}
        />
      }
    </section>
  );
};

export default Employees;
