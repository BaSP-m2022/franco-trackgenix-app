import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeSheet } from 'redux/timeSheets/actions';
import { getTimeSheets, deleteTimeSheet } from 'redux/timeSheets/thunks';
import { Table, LoadingScreen, Modal, Button, Search } from 'components/Shared';
import styles from './list.module.css';

const TimeSheets = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const timeSheets = useSelector((state) => state.timeSheets.list);
  const loading = useSelector((state) => state.timeSheets.loading);
  const error = useSelector((state) => state.timeSheets.error);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(timeSheets);
  const [tasksData, setTasksData] = useState([]);
  const [modalTitle, setModalTitle] = useState('Timesheet');
  const [isTable, setIsTable] = useState(false);

  const column = [
    { heading: 'First Name', value: 'employeeId.firstName' },
    { heading: 'Last Name', value: 'employeeId.lastName' },
    { heading: 'Start Date', value: 'startDate' },
    { heading: 'Tasks', value: 'tasks' }
  ];

  const columnTasks = [
    { heading: 'Project Name', value: 'projectId.name' },
    { heading: 'Date', value: 'date' },
    { heading: 'description', value: 'description' },
    { heading: 'Worked Hours', value: 'workedHours' }
  ];

  const handleArray = (tasks) => {
    setTasksData(tasks);
    setIsTable(true);
    setModalTitle('Tasks in Time Sheet');
    openModal();
  };

  useEffect(() => {
    if (!timeSheets.length) {
      dispatch(getTimeSheets());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      timeSheets.filter((item) =>
        item.employeeId.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [timeSheets, searchQuery]);

  const handleSetTimeSheet = (id) => {
    dispatch(setTimeSheet(id));
    history.push('/time-sheets/form');
  };

  function buttonDelete(id) {
    setDeleteId(id);
    setModalTitle('Delete Timesheet');
    setIsTable(false);
    openModal();
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section className={styles.container}>
      <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={closeModal}>
        {isTable && <Table data={tasksData} column={columnTasks} modal={handleArray} />}
        {isTable && (
          <div>
            <Button text="OK" handler={closeModal} />
          </div>
        )}
        {!isTable && <p>{error ? error : 'Are you sure to delete a Time Sheet?'}</p>}
        {!isTable && (
          <div>
            {error ? (
              <div>
                <Button text="Close" handler={closeModal} />
              </div>
            ) : (
              <div>
                <Button
                  text="Yes"
                  type="delete"
                  handler={() => {
                    dispatch(deleteTimeSheet(deleteId));
                    closeModal();
                  }}
                />
                <Button text="No" handler={closeModal} />
              </div>
            )}
          </div>
        )}
      </Modal>
      <h2 className={styles.title}>Timesheets</h2>
      <div className={styles.buttons}>
        <Button
          text={'Add Timesheet'}
          handler={() => {
            history.push('/time-sheets/form');
          }}
        />
        <Search
          placeholder="Search by first name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <Table
        data={searchQuery.length ? filteredList : timeSheets}
        column={column}
        deleteItem={buttonDelete}
        editItem={handleSetTimeSheet}
        buttons={2}
        modal={handleArray}
        arrayName={'Tasks'}
      />
    </section>
  );
};

export default TimeSheets;
