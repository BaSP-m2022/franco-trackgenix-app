import { useState, useEffect } from 'react';
import styles from './Project.module.css';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import Select from '../Shared/SelectDropdown';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/projects/actions';
import { postProject, putProject } from '../../redux/projects/thunks';
import { getEmployees } from '../../redux/employees/thunks';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const project = useSelector((state) => state.projects.project);
  const loading = useSelector((state) => state.projects.isLoading);
  const error = useSelector((state) => state.projects.error);

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
  const [requestType, setRequestType] = useState('POST');

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [buttonText, setButtonText] = useState('Add Project');

  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const onAddEmployee = (event) => {
    event.preventDefault();
    if (employeeIdValue != '' && rateValue != '' && roleValue != '') {
      setEmployeesValue([
        ...employeesValue,
        { employeeId: employeeIdValue, rate: rateValue, role: roleValue }
      ]);
    } else {
      setMsg('Complete the rate and role');
      openModal();
    }
  };

  useEffect(() => {
    dispatch(getEmployees());
    const newEmployees = employees.map((employee) => {
      return {
        label: `${employee.firstName} ${employee.lastName}`,
        value: employee._id
      };
    });
    setEmployeeOptions(newEmployees);
  }, []);

  useEffect(() => {
    if (typeof project === 'object' && project._id) {
      let startDate = project.startDate.slice(0, 10);
      let endDate = project.endDate ? project.endDate.slice(0, 10) : '';
      setNameValue(project.name);
      setStatusValue(project.status);
      setDescriptionValue(project.description);
      setStartDateValue(startDate);
      setEndDateValue(endDate);
      setRequestType('PUT');
      setTitle('Edit Project');
      setButtonText('Update Project');
      employees.map((employee) => {
        let ep = [];
        if (project.employees != [] && project.employees[0].employeeId === employee._id) {
          for (let i = 0; i < project.employees.length; i++) {
            ep.push({
              employeeId: employee._id,
              rate: project.employees[i].rate,
              role: project.employees[i].role
            });
          }
          return ep;
        }
        setEmployeesValue(ep);
      });
    }
  }, [error]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      name: nameValue,
      status: statusValue,
      description: descriptionValue,
      employees: employeesValue,
      startDate: startDateValue,
      endDate: endDateValue
    };
    if (requestType === 'PUT') {
      dispatch(putProject(project._id, body));
      setModalTitle('Project updated');
      setMsg('Project updated successfully!');
      openModal();
    } else {
      dispatch(postProject(body));
      setModalTitle('Project created');
      setMsg('Project created successfully!');
      openModal();
    }
  };

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
        <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={() => closeModal()}>
          <p>{msg}</p>
          <div>
            <Button
              text="OK"
              handler={() => {
                closeModal();
                if (!error) {
                  routeChange();
                }
              }}
            />
          </div>
        </Modal>
        <h2 className={styles.h2}>{title}</h2>
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
              placeholder="Status: active or inactive"
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
            <Button
              text="Return"
              handler={() => {
                dispatch(clearError());
                routeChange();
              }}
            />
            <Button text={buttonText} handler={onSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
