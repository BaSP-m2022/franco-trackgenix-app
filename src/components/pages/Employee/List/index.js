import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import { setEmployee, clearError } from 'redux/employees/actions';
import { Table, LoadingScreen, Modal, Button, Search } from 'components/Shared';
import styles from './list.module.css';

const Employees = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(employees);

  const column = [
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
    openModal();
  };

  useEffect(() => {
    if (!employees.length) {
      dispatch(getEmployees());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      employees.filter((employee) =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [employees, searchQuery]);

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    []
  );

  const delEmployee = () => {
    dispatch(deleteEmployee(idToDelete));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      <Modal modalTitle={'Employees'} isOpen={isOpen}>
        <p>{error ? error : 'Are you sure you want to delete an employee?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={closeModal} />
            </div>
          ) : (
            <div>
              <Button text="Yes" type="delete" handler={delEmployee} />
              <Button text="No" handler={closeModal} />
            </div>
          )}
        </div>
      </Modal>
      <h2 className={styles.title}>Employees</h2>
      <div className={styles.addEmployee}>
        <Button
          text="Add new employee"
          handler={() => {
            dispatch(setEmployee());
            history.push('/employees/form');
          }}
        />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={'Search by first name'}
        />
      </div>
      <Table
        data={searchQuery.length ? filteredList : employees}
        deleteItem={buttonDelete}
        column={column}
        editItem={handleSetEmployee}
        buttons={true}
        handleRowClick={(e) => history.push(`employees/${e.currentTarget.getAttribute('data-id')}`)}
      />
    </section>
  );
};

export default Employees;
