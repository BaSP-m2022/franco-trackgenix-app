import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import SelectDropdown from '../Shared/SelectDropdown';
import Input from '../Shared/Input';

function TimeSheetForm() {
  const [taskValue, setTaskValue] = useState([]);
  const [totalHoursValue, setTotalHoursValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [employeeIdValue, setEmployeeIdValue] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [tasksOptions, setTasksOptions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const routeChange = () => {
    let path = `/time-sheets`;
    history.push(path);
  };

  const statusOption = [
    { value: 'To do', label: 'To do' },
    { value: 'In progress', label: 'In progress' },
    { value: 'Done', label: 'Done' }
  ];

  const closeModal = () => {
    setShowModal(false);
  };
  const onChangeStatusInput = (event) => {
    setStatusValue(event.target.value);
  };

  const onChangeTaskInput = (event) => {
    if (taskValue.indexOf(event.target.value) > -1) {
      setTaskValue(taskValue.filter((task) => task !== event.target.value));
    } else {
      setTaskValue([...taskValue, event.target.value]);
    }
  };
  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const employeesData = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await employeesData.json();
      setEmployeeOptions(
        employees.data.map(({ _id, firstName, lastName }) => ({
          value: _id,
          label: `${firstName} ${lastName}`
        }))
      );
      const tasksData = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`);
      const tasks = await tasksData.json();
      setTasksOptions(
        tasks.data.map(({ _id, description }) => ({ value: _id, label: description }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const timeSheetId = params.get('id');
    if (timeSheetId) {
      fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setTaskValue(response.data.tasks);
          setTotalHoursValue(response.data.totalHours);
          setStatusValue(response.data.status);
          setStartDateValue(response.data.startDate.split('T')[0]);
          setEndDateValue(response.data.endDate.split('T')[0]);
          setEmployeeIdValue(response.data.employeeId);
        })
        .catch((error) => {
          setError(error.toString());
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const timeSheetId = params.get('id');
    setModalMessage('Timesheet created correctly!');
    let url = `${process.env.REACT_APP_API_URL}/time-sheets/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks: taskValue,
        totalHours: totalHoursValue,
        status: statusValue,
        startDate: startDateValue,
        endDate: endDateValue,
        employeeId: employeeIdValue
      })
    };
    if (timeSheetId) {
      setModalMessage('Timesheet edited correctly!');
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.error) {
        setModalMessage('There was an error');
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Time Sheets Form</h2>
      <form onSubmit={onSubmit}>
        <div className="select">
          <label className={styles.label}>Task</label>
          <SelectDropdown
            onChange={onChangeTaskInput}
            value={taskValue}
            required="true"
            type="text"
            options={tasksOptions}
            disabled={isLoading}
          />
        </div>

        <div className="input">
          <label className={styles.label}>Total Hours</label>
          <Input
            placeholder="Total Hours"
            type="number"
            value={totalHoursValue}
            onChange={setTotalHoursValue}
            disabled={isLoading}
          />
        </div>
        <div className="select">
          <label className={styles.label}>Status</label>
          <SelectDropdown
            onChange={onChangeStatusInput}
            value={statusValue}
            props="status"
            required="true"
            type="status"
            options={statusOption}
            disabled={isLoading}
          />
        </div>
        <div className="input">
          <label className={styles.label}>Start Date</label>
          <Input
            placeholder="Start Date"
            type="date"
            value={startDateValue}
            onChange={setStartDateValue}
            disabled={isLoading}
          />
        </div>
        <div className="input">
          <label className={styles.label}>End Date</label>
          <Input
            placeholder="End Date"
            type="date"
            value={endDateValue}
            onChange={setEndDateValue}
            disabled={isLoading}
          />
        </div>
        <div className="select">
          <label className={styles.label}>Employees</label>
          <SelectDropdown
            onChange={onChangeEmployeeIdInput}
            value={employeeIdValue}
            props="employeeId"
            required="true"
            type="text"
            options={employeeOptions}
            disabled={isLoading}
          />
        </div>
        <Button text="Submit" handler={onSubmit} />
        <Modal isOpen={showModal} modalTitle={modalMessage} handleClose={closeModal}>
          <div>
            <Button text="Accept" handler={routeChange} />
          </div>
        </Modal>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}

export default TimeSheetForm;
