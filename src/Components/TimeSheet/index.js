import { useState } from 'react';
import styles from './form.module.css';

function TimeSheetForm() {
  const [taskValue, settaskValue] = useState('');
  const [totalHoursValue, settotalHoursValue] = useState('');
  const [statusValue, setstatusValue] = useState('');
  const [startDateValue, setstartDateValue] = useState('');
  const [endDateValue, setendDateValue] = useState('');
  const [employeeIdValue, setemployeeIdValue] = useState('');

  const onChangeTaskInput = (event) => {
    settaskValue(event.target.value);
  };

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
  const onChangeEmployeeIdInput = (event) => {
    setemployeeIdValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/time-sheets/`;
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
        <input
          className={styles.input}
          id="task"
          name="task"
          required
          type="text"
          value={taskValue}
          onChange={onChangeTaskInput}
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
        <input
          className={styles.input}
          id="employeeId"
          name="employeeId"
          required
          type="text"
          value={employeeIdValue}
          onChange={onChangeEmployeeIdInput}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default TimeSheetForm;
