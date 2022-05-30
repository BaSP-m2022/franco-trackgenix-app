import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './Project.module.css';

function ProjectForm() {
  const [nameValue, setnameValue] = useState('');
  const [statusValue, setstatusValue] = useState('');
  const [descriptionValue, setdescriptionValue] = useState('');
  const [employeeIdValue, setemployeeIdValue] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [startDateValue, setstartDateValue] = useState('');
  const [endDateValue, setendDateValue] = useState('');

  const onChangeNameInput = (event) => {
    setnameValue(event.target.value);
  };
  const onChangeStatusInput = (event) => {
    setstatusValue(event.target.value);
  };
  const onChangeDescriptionInput = (event) => {
    setdescriptionValue(event.target.value);
  };
  const onChangeEmployeeIdInput = (event) => {
    setemployeeIdValue(event.target.value);
  };
  const onChangeStartDateInput = (event) => {
    setstartDateValue(event.target.value);
  };
  const onChangeEndDateInput = (event) => {
    setendDateValue(event.target.value);
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

  const onSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/projects/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        status: statusValue,
        description: descriptionValue,
        employeeId: employeeIdValue,
        startDate: startDateValue,
        endDate: endDateValue
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
      <h2>Project Form</h2>
      <form onSubmit={onSubmit}>
        <input
          className={styles.input}
          id="name"
          name="name"
          required
          type="text"
          value={nameValue}
          onChange={onChangeNameInput}
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
          id="description"
          name="description"
          required
          type="text"
          value={descriptionValue}
          onChange={onChangeDescriptionInput}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProjectForm;
