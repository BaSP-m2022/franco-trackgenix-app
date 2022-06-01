import { useState, useEffect } from 'react';
import 'react-dropdown/style.css';
import styles from './Project.module.css';

function EmployeeItem({ employee }) {
  return (
    <tr>
      <td>{employee.employeeId}</td>
      <td>{employee.role}</td>
      <td>{employee.rate}</td>
    </tr>
  );
}

function ProjectForm() {
  const [nameValue, setnameValue] = useState('');
  const [statusValue, setstatusValue] = useState('');
  const [descriptionValue, setdescriptionValue] = useState('');
  const [employeeIdValue, setemployeeIdValue] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [startDateValue, setstartDateValue] = useState('');
  const [endDateValue, setendDateValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [employeesValue, setEmployeesValue] = useState([]);

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
  const onChangeRateInput = (event) => {
    setRateValue(event.target.value);
  };
  const onChangeRoleInput = (event) => {
    setRoleValue(event.target.value);
  };

  const onAddEmployee = (event) => {
    event.preventDefault();
    setEmployeesValue([
      ...employeesValue,
      { employeeId: employeeIdValue, rate: rateValue, role: roleValue }
    ]);
  };
  useEffect(async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await data.json();
      const newEmployees = employees.data.map((employee) => {
        return {
          label: `${employee.firstName} ${employee.lastName}`,
          value: employee._id
        };
      });
      console.log('mensaje prueba', newEmployees);
      setEmployeeOptions(newEmployees);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    let url = `${process.env.REACT_APP_API_URL}/projects/`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        status: statusValue,
        description: descriptionValue,
        employees: employeesValue,
        startDate: startDateValue,
        endDate: endDateValue
      })
    };
    if (projectId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/projects/${projectId}`;
    }
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
        <label>Name</label>
        <input
          className={styles.input}
          id="name"
          name="name"
          required
          type="text"
          value={nameValue}
          onChange={onChangeNameInput}
        />
        <label>Status</label>
        <input
          className={styles.input}
          id="status"
          name="status"
          required
          type="text"
          value={statusValue}
          onChange={onChangeStatusInput}
        />
        <label>Description</label>
        <input
          className={styles.input}
          id="description"
          name="description"
          required
          type="text"
          value={descriptionValue}
          onChange={onChangeDescriptionInput}
        />
        <div className={styles.container}>
          <select
            onChange={onChangeEmployeeIdInput}
            value={employeeIdValue}
            className={styles.input}
            id="employeeId"
            name="employeeId"
            required
            type="text"
          >
            <option value="" disabled>
              Select a Employee
            </option>
            {employeeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label>Rate</label>
          <input
            className={styles.input}
            id="rate"
            name="rate"
            required
            type="number"
            value={rateValue}
            onChange={onChangeRateInput}
          />
          <label>Role</label>
          <input
            className={styles.input}
            id="role"
            name="role"
            required
            type="text"
            value={roleValue}
            onChange={onChangeRoleInput}
          />
          <button onClick={onAddEmployee} type="submit">
            Add
          </button>
          <table>
            <thead>
              <tr>
                <th id="employeeId">ID</th>
                <th id="role">Role</th>
                <th id="rate">Rate</th>
              </tr>
            </thead>
            <tbody>
              {employeesValue.map((employee) => (
                <EmployeeItem key={employee.employeeId} employee={employee} />
              ))}
            </tbody>
          </table>
        </div>
        <label>Start Date</label>
        <input
          className={styles.input}
          id="startDate"
          name="startDate"
          required
          type="date"
          value={startDateValue}
          onChange={onChangeStartDateInput}
        />
        <label>End Date</label>
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
