import { useState, useEffect } from 'react';
import styles from './project.module.css';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import Select from '../Shared/SelectDropdown';
import { useHistory } from 'react-router-dom';

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
  const [employeeIdValue, setEmployeeIdValue] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [title, setTitle] = useState('Add Project');
  const [rateValue, setRateValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [employeesValue, setEmployeesValue] = useState([]);

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Add Project');

  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
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
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('id');
      if (projectId) {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
        const projectFetch = await data.json();
        let startDate = projectFetch.data.startDate.slice(0, 10);
        let endDate = projectFetch.data.endDate ? projectFetch.data.endDate.slice(0, 10) : '';
        setNameValue(projectFetch.data.name);
        setStatusValue(projectFetch.data.status);
        setDescriptionValue(projectFetch.data.description);
        setStartDateValue(startDate);
        setEndDateValue(endDate);
        setTitle('Edit Project');
        setButtonText('Update Project');
        const dataEmployees = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
        const employees = await dataEmployees.json();
        employees.data.map((employee) => {
          if (
            projectFetch.data.employees != [] &&
            projectFetch.data.employees[0].employeeId._id === employee._id
          ) {
            let ep = [];
            for (let i = 0; i < projectFetch.data.employees.length; i++) {
              ep.push({
                employeeId: employee._id,
                rate: projectFetch.data.employees[i].rate,
                role: projectFetch.data.employees[i].role
              });
            }
            setEmployeesValue(ep);
          }
        });
      }
      const data = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const employees = await data.json();
      const newEmployees = employees.data.map((employee) => {
        return {
          label: `${employee.firstName} ${employee.lastName}`,
          value: employee._id
        };
      });
      setEmployeeOptions(newEmployees);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      nameValue === '' ||
      statusValue === '' ||
      descriptionValue === '' ||
      startDateValue === '' ||
      endDateValue === ''
    ) {
      setMsg('Please enter all fields');
      setIsOpen(true);
    } else {
      setLoading(true);
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
        setLoading(false);
        if (response.status === 200 || response.status === 201) {
          if (options.method === 'POST') {
            setMsg('The Projects was created.');
            setIsOpen(true);
            setRedirect(true);
          } else {
            setMsg('The project was edited');
            setModalTitle('Edit Project');
            setIsOpen(true);
            setRedirect(true);
          }
        } else {
          setMsg(data.message);
          setIsOpen(true);
          setRedirect(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `/projects`;
    history.push(path);
  };

  const ls = LoadingScreen();
  if (loading) {
    return ls;
  } else {
    return (
      <div className={styles.container}>
        <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
          <p>{msg}</p>
          <div>
            <Button text="OK" handler={redirect ? routeChange : () => setIsOpen(!isOpen)} />
          </div>
        </Modal>
        <h2>{title}</h2>
        <form className={styles.form}>
          <div className={styles.projects}>
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
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.employee}>
              <div className={styles.select}>
                <label className={styles.label}>Employee</label>
                <Select
                  className={styles.label}
                  value={employeeIdValue}
                  onChange={onChangeEmployeeIdInput}
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
              <Button text="Add employee" handler={onAddEmployee} />
            </div>
          </div>
          <div className={styles.containerTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th id="employeeId">ID</th>
                  <th id="role">Role</th>
                  <th id="rate">Rate</th>
                </tr>
              </thead>
              <tbody>
                {employeesValue.map((employee, index) => (
                  <EmployeeItem key={index} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.dates}>
            <div className={styles.date}>
              <Input
                className={styles.label}
                name="Start Date"
                type="date"
                value={startDateValue}
                onChange={setStartDateValue}
              />
            </div>
            <div className={styles.date}>
              <Input
                className={styles.label}
                name="End Date"
                type="date"
                value={endDateValue}
                onChange={setEndDateValue}
              />
            </div>
          </div>
          <div>
            <Button text="Return" handler={routeChange} />
            <Button text={buttonText} handler={onSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
