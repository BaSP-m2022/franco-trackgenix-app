import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
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
    settaskValue(event.value);
  };
  const onChangeEmployeeIdInput = (event) => {
    setemployeeIdValue(event.value);
  };

  useEffect(async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await data.json();
      for (let i = 0; i < employees.data.length; i++) {
        setEmployeeOptions((employeeOptions) => [
          ...employeeOptions,
          {
            value: `${employees.data[i]._id}`,
            label: `${employees.data[i].firstName} ${employees.data[i].lastName}`
          }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`);
      const tasks = await data.json();
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
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/time-sheets/`;
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
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Time Sheets Form</h2>
      <form onSubmit={onSubmit}>
        <Dropdown
          options={tasksOptions}
          onChange={onChangeTaskInput}
          value={taskValue}
          placeholder="Select a task"
          className={styles.input}
          id="task"
          name="task"
          required
          type="text"
        />
        <input
          className={styles.input}
          id="totalHours"
          name="totalHours"
          required
          type="number"
          value={totalHoursValue}
          onChange={onChangeTotalHoursInput}
        />
        <input
          className={styles.input}
          id="status"
          name="status"
          required
          type="text"
          value={statusValue}
          onChange={onChangeStatusInput}
        />
        <input
          className={styles.input}
          id="startDate"
          name="startDate"
          required
          type="date"
          value={startDateValue}
          onChange={onChangeStartDateInput}
        />
        <input
          className={styles.input}
          id="endDate"
          name="endDate"
          required
          type="date"
          value={endDateValue}
          onChange={onChangeEndDateInput}
        />
        <Dropdown
          options={employeeOptions}
          onChange={onChangeEmployeeIdInput}
          value={employeeIdValue}
          placeholder="Select an employee"
          className={styles.input}
          id="employeeId"
          name="employeeId"
          required
          type="text"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default TimeSheetForm;
