/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styles from './Project.module.css';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import Select from '../Shared/SelectDropdown';

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
  const [nameValue, setNameValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [employeeIdValue, setEmployeeIdValue] = useState({});
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [employeesValue, setEmployeesValue] = useState([]);

  const onAddEmployee = (event) => {
    event.preventDefault();
    setEmployeesValue([
      ...employeesValue,
      { employeeId: employeeIdValue, rate: rateValue, role: roleValue }
    ]);
  };

  useEffect(async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('id');
      if (projectId) {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
        const projectFetch = await data.json();
        console.log(projectFetch);
        let startDate = projectFetch.data.startDate.slice(0, 10);
        let endDate = projectFetch.data.endDate ? projectFetch.data.endDate.slice(0, 10) : '';
        setNameValue(projectFetch.data.name);
        setStatusValue(projectFetch.data.status);
        setDescriptionValue(projectFetch.data.description);
        setStartDateValue(startDate);
        setEndDateValue(endDate);
      }
      const data = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await data.json();
      const newEmployees = employees.data.map((employee) => {
        return {
          label: `${employee.firstName} ${employee.lastName}`,
          value: employee._id
        };
      });
      console.log(newEmployees);
      setEmployeeOptions(newEmployees);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

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

    const params = new URLSearchParams(window.location.search);
    const projectId2 = params.get('id');

    if (projectId2) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API_URL}/projects/${projectId2}`;
    }
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status === 200 || response.status === 201) {
        if (options.method === 'POST') {
          window.alert('The Project was created.');
          window.location.href = '/projects';
        } else {
          window.alert('The Projects was changed.');
          window.location.href = '/projects';
        }
      } else {
        window.alert(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Project Form</h2>
      <form onSubmit={onSubmit}>
        <Input
          className={styles.label}
          name="Name"
          type="text"
          value={nameValue}
          placeholder="Name"
          onChange={setNameValue}
        />
        <Input
          className={styles.label}
          name="Status"
          type="text"
          value={statusValue}
          placeholder="Status"
          onChange={setStatusValue}
        />
        <Input
          className={styles.label}
          name="Description"
          type="text"
          value={descriptionValue}
          placeholder="Description"
          onChange={setDescriptionValue}
        />
        <div className={styles.employee}>
          <div className={styles.select}>
            <label className={styles.label}>Employee</label>
            <Select
              className={styles.label}
              value={employeeIdValue}
              onChange={setEmployeesValue}
              options={employeeOptions}
              required={true}
            />
          </div>
          <Input
            className={styles.label}
            name="Rate"
            type="number"
            value={rateValue}
            placeholder="Rate"
            onChange={setRateValue}
          />
          <Input
            className={styles.label}
            name="Role"
            type="text"
            value={roleValue}
            placeholder="Role"
            onChange={setRoleValue}
          />
        </div>
        <Button text="Add" handler={onAddEmployee} />
        <div className={styles.table}>
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
        <Input
          className={styles.label}
          name="Start Date"
          type="date"
          value={startDateValue}
          onChange={setStartDateValue}
        />
        <Input
          className={styles.label}
          name="End Date"
          type="date"
          value={endDateValue}
          onChange={setEndDateValue}
        />
        <Button text="Submit" handler={onSubmit} />
      </form>
    </div>
  );
}

export default ProjectForm;
