import { useState, useEffect } from 'react';
import styles from './form.module.css';

function TimeSheetForm() {
  const [taskValue, setTaskValue] = useState('');
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

  const closeModal = () => {
    setShowModal(false);
  };
  const onChangeTotalHoursInput = (event) => {
    setTotalHoursValue(event.target.value);
  };
  const onChangeStatusInput = (event) => {
    setStatusValue(event.target.value);
  };
  const onChangeStartDateInput = (event) => {
    setStartDateValue(event.target.value);
  };
  const onChangeEndDateInput = (event) => {
    setEndDateValue(event.target.value);
  };
  const onChangeTaskInput = (event) => {
    setTaskValue(event.target.value);
  };
  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const employeesData = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await employeesData.json();
      for (let i = 0; i < employees.data.length; i++) {
        setEmployeeOptions((employeeOptions) => [
          ...employeeOptions,
          {
            value: `${employees.data[i]._id}`,
            label: `${employees.data[i].firstName} ${employees.data[i].lastName}`
          }
        ]);
      }
      const tasksData = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`);
      const tasks = await tasksData.json();
      for (let i = 0; i < tasks.data.length; i++) {
        setTasksOptions((tasksOptions) => [
          ...tasksOptions,
          {
            value: `${tasks.data[i]._id}`,
            label: `${tasks.data[i].description}`
          }
        ]);
      }
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
          // console.log(response.data.tasks);
          // console.log(response.data.employeeId);
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
        tasks: [taskValue._id],
        totalHours: totalHoursValue,
        status: statusValue,
        startDate: startDateValue,
        endDate: endDateValue,
        employeeId: employeeIdValue._id
      })
    };
    console.log(employeeIdValue, 'employee value');
    console.log(taskValue, 'task Value');
    if (timeSheetId) {
      setModalMessage('Timesheet edited correctly!');
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setModalMessage(error.toString());
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
        <select
          onChange={onChangeTaskInput}
          value={taskValue}
          className={styles.input}
          id="task"
          name="task"
          required
          type="text"
          disabled={isLoading}
        >
          <option value="" disabled>
            Select a task
          </option>
          {tasksOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* hacer el map de las tareas del usuario */}
        <input
          className={styles.input}
          id="totalHours"
          name="totalHours"
          required
          type="number"
          value={totalHoursValue}
          onChange={onChangeTotalHoursInput}
          disabled={isLoading}
        />
        <input
          className={styles.input}
          id="status"
          name="status"
          required
          type="text"
          value={statusValue}
          onChange={onChangeStatusInput}
          disabled={isLoading}
        />
        <input
          className={styles.input}
          id="startDate"
          name="startDate"
          required
          type="date"
          value={startDateValue}
          onChange={onChangeStartDateInput}
          disabled={isLoading}
        />
        <input
          className={styles.input}
          id="endDate"
          name="endDate"
          required
          type="date"
          value={endDateValue}
          onChange={onChangeEndDateInput}
          disabled={isLoading}
        />
        <select
          onChange={onChangeEmployeeIdInput}
          value={employeeIdValue}
          className={styles.input}
          id="employeeId"
          name="employeeId"
          required
          type="text"
          disabled={isLoading}
        >
          <option value="" disabled>
            Select an employee
          </option>
          {employeeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isLoading}>
          Save
        </button>
        {showModal && (
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <h3>{modalMessage}</h3>
              <button disabled={isLoading} onClick={closeModal} className={styles.button}>
                OK
              </button>
            </div>
          </div>
        )}
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}

export default TimeSheetForm;
