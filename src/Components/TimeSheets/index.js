import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';

import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

const TimeSheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const URL = `${process.env.REACT_APP_API_URL}/time-sheets`;

  const column = [
    { heading: 'First name', value: 'employeeId.firstName' },
    { heading: 'Last name', value: 'employeeId.lastName' },
    { heading: 'Tasks', value: 'tasks[0].description' },
    { heading: 'Total hours', value: 'totalHours' },
    { heading: 'Status', value: 'status' },
    { heading: 'Start date', value: 'startDate' },
    { heading: 'End date', value: 'endDate' },
    { heading: 'Id', value: '_id' }
  ];

  useEffect(() => {
    async function fetchAdmins() {
      try {
        setLoading(true);
        const response = await fetch(`${URL}`);
        const { message, data, error } = await response.json();
        if (!error) {
          setTimesheets(data);
          setUntouchedData(data);
          console.log('data', data);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  function handleDeleteTimesheet(id) {
    setDeleteId(id);
    setIsOpen(true);
  }

  async function deleteTimesheet(id) {
    const response = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    const responseJson = await response.json();
    if (responseJson.error) {
      alert('error');
    } else {
      setTimesheets(timesheets.filter((item) => item._id !== id));
      setIsOpen(false);
    }
  }

  function search(value) {
    setSearchQuery(value);
    const result = untouchedData.filter((employee) => employee._id.includes(value));
    setTimesheets(result);
  }

  return (
    <section className={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Modal
            modalTitle="Are you sure you want to delete?"
            isOpen={isOpen}
            handleClose={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Button text="Yes" type="delete" handler={() => deleteTimesheet(deleteId)} />
            <Button text="No" handler={() => setIsOpen(false)} />
          </Modal>
          <h2>Timesheets</h2>
          <div className={styles.buttonContainer}>
            <Button text="Add timesheet" link={'/time-sheetS/form'} />
            <Search
              placeholder="Search timesheet"
              searchQuery={searchQuery}
              setSearchQuery={search}
            />
          </div>
          <Table
            data={timesheets}
            column={column}
            deleteItem={handleDeleteTimesheet}
            entity="time-sheets"
          />
        </>
      )}
    </section>
  );
};

export default TimeSheets;
