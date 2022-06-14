import styles from './employee.module.css';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import LoadingScreen from '../Shared/LoadingScreen';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError } from '../../redux/employees/actions';
import { addEmployee, putEmployee } from '../../redux/employees/thunks';

const EmployeeForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [requestType, setRequestType] = useState('POST');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [title, setTitle] = useState('Add Employee');

  const employee = useSelector((state) => state.employees.employee);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (typeof employee === 'object' && employee._id) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setDateOfBirth(employee.dateOfBirth.slice(0, 10));
      setEmail(employee.email);
      setPassword(employee.password);
      setDni(employee.dni);
      setRequestType('PUT');
      setTitle('Edit Employee');
    }
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      firstName,
      lastName,
      dni,
      email,
      password,
      dateOfBirth
    });
    if (requestType === 'PUT') {
      dispatch(putEmployee(employee._id, body));
      setModalTitle('Employee updated');
      setMsg('Employee updated successfully!');
      openModal();
    } else {
      dispatch(addEmployee(body));
      setModalTitle('Employee created');
      setMsg('Employee created successfully!');
      openModal();
    }
  }

  const routeChange = () => {
    let path = `/employees`;
    history.push(path);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <div className={styles.containerSec}>
      <h2 className={styles.formTitle}>{title}</h2>
      <form className={styles.form}>
        <div>
          <Input
            name="First Name"
            type="text"
            value={firstName}
            placeholder="Enter your First Name"
            onChange={setFirstName}
          />
          <Input
            name="Last Name"
            type="text"
            value={lastName}
            placeholder="Enter your Last Name"
            onChange={setLastName}
          />
          <Input
            name="Date Of Birth"
            type="date"
            value={dateOfBirth}
            placeholder="Enter your Birth date"
            onChange={setDateOfBirth}
          />
          <Input
            name="Dni"
            type="number"
            value={dni}
            placeholder="Enter your DNI"
            onChange={setDni}
          />
          <Input
            name="Email"
            type="email"
            value={email}
            placeholder="Enter your e-mail address"
            onChange={setEmail}
          />
          <Input
            name="Password"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={setPassword}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text="Return"
            handler={() => {
              dispatch(cleanError());
              routeChange();
            }}
          />
          <Button
            text={!loading && requestType === 'POST' ? 'Add Employee' : 'Update Employee'}
            handler={handleSubmit}
          />
          <Modal modalTitle={error ? 'Error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
            <p>{error ? error : msg}</p>
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
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
