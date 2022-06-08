import { useState, useEffect } from 'react';
import styles from './employee.module.css';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../Shared/LoadingScreen';

const EmployeeForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [requestType, setRequestType] = useState('POST');
  const [editEmployeeId, setEditEmployeeId] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchEmployee(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setErrorMessage(message);
      } else {
        setEditEmployeeId(id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        let date = data.dateOfBirth.slice(0, 10);
        setDateOfBirth(date);
        setEmail(data.email);
        setPassword(data.password);
        setDni(data.dni);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get('id');

    if (employeeId) {
      setEditEmployeeId(employeeId);
      setRequestType('PUT');
      fetchEmployee(employeeId);
    } else {
      setRequestType('POST');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const URL =
        process.env.REACT_APP_API_URL +
        `/employees${requestType === 'POST' ? '' : `/${editEmployeeId}`}`;

      const response = await fetch(URL, {
        method: requestType,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
          dni
        })
      });
      const data = await response.json();
      setLoading(false);
      if (data.error) {
        setErrorMessage(data.message);
      } else {
        const msg = requestType === 'POST' ? 'Employee created' : 'Employee updated';
        setErrorMessage('');
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setEmail('');
        setPassword('');
        setDni('');
        setMsg(msg);
        setIsOpen(!isOpen);
      }
    } catch (error) {
      setErrorMessage(error.toString());
    }
  }

  const history = useHistory();
  const routeChange = () => {
    let path = `/employees`;
    history.push(path);
  };

  return (
    <div className={styles.containerSec}>
      <h3>Add Employee</h3>
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
            placeholder="Enter your IDN"
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
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {loading && <LoadingScreen />}
          <Button text="Return" handler={routeChange} />
          <Button
            text={!loading && requestType === 'POST' ? 'Add Employee' : 'Update Employee'}
            handler={handleSubmit}
          />
          <Modal
            modalTitle={!loading && requestType === 'POST' ? 'Add Employee' : 'Update Employee'}
            isOpen={isOpen}
            handleClose={() => setIsOpen(!isOpen)}
          >
            {msg}
            <div>
              <Button text="OK" handler={routeChange} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
