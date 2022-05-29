import { useState, useEffect } from 'react';
import styles from './form.module.css';

function TimeSheetForm() {
  const [taskValue, settaskValue] = useState('');
  const [totalHoursValue, settotalHoursValue] = useState('');
  const [statusValue, setstatusValue] = useState('');
  const [startDateValue, setstartDateValue] = useState('');
  const [endDateValue, setendDateValue] = useState('');
  const [employeeIdValue, setemployeeIdValue] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [tasksOptions, setTasksOptions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onChangeTotalHoursInput = (event) => {
    settotalHoursValue(event.target.value);
  };
  const onChangeStatusInput = (event) => {
    setstatusValue(event.target.value);
  };
  const onChangeStartDateInput = (event) => {
    setstartDateValue(event.target.value);
  };
  const onChangeEndDateInput = (event) => {
    setendDateValue(event.target.value);
  };
  const onChangeTaskInput = (event) => {
    settaskValue(event.target.value);
  };
  const onChangeEmployeeIdInput = (event) => {
    setemployeeIdValue(event.target.value);
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
          // settaskValue(response.data[0].tasks[0]);
          settotalHoursValue(response.data.totalHours);
          setstatusValue(response.data.status);
          setstartDateValue(response.data.startDate.split('T')[0]);
          setendDateValue(response.data.endDate.split('T')[0]);
          // setemployeeIdValue(response.data[0].employeeId);
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

    let url = `${process.env.REACT_APP_API_URL}/time-sheets/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks: [taskValue],
        totalHours: totalHoursValue,
        status: statusValue,
        startDate: startDateValue,
        endDate: endDateValue,
        employeeId: employeeIdValue
      })
    };
    if (timeSheetId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/time-sheets/${timeSheetId}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
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
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}

export default TimeSheetForm;
