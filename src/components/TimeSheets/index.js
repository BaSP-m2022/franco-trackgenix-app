import styles from './time-sheets.module.css';
import { setTimeSheet } from '../../redux/timeSheets/actions';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheets, deleteTimeSheet } from '../../redux/timeSheets/thunks';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

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

  const column = [
    { heading: 'First name', value: 'employeeId.firstName' },
    { heading: 'Last name', value: 'employeeId.lastName' },
    { heading: 'Tasks', value: 'tasks[0].description' },
    { heading: 'Total hours', value: 'totalHours' },
    { heading: 'Start date', value: 'startDate' },
    { heading: 'Id', value: '_id' }
  ];

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
      timeSheets.filter((item) => item._id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [timeSheets, searchQuery]);

  const handleSetTimeSheet = (id) => {
    dispatch(setTimeSheet(id));
    history.push('/time-sheets/form');
  };

  function buttonDelete(id) {
    setDeleteId(id);
    openModal();
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.container}>
      {loading ? (
        <div className={styles.loadingDiv}>
          <LoadingScreen />
        </div>
      ) : (
        <>
          <Modal modalTitle={'Time Sheets'} isOpen={isOpen}>
            <p>{error ? error : 'Are you sure to delete a Time Sheet?'}</p>
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
          </Modal>
          <h2>Timesheets</h2>
          <div className={styles.buttonContainer}>
            <Button text="Add timeSheet" link={'/time-sheets/form'} />
            <Search
              placeholder="Search by ID"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <Table
            data={searchQuery.length ? filteredList : timeSheets}
            column={column}
            deleteItem={buttonDelete}
            editItem={handleSetTimeSheet}
          />
        </>
      )}
    </section>
  );
};

export default TimeSheets;
