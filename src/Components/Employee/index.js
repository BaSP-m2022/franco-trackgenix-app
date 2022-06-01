import { useState, useEffect } from 'react';
import styles from './employee.module.css';
import Input from './Input/Input.jsx';

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

  useEffect(() => {
    async function fetchEmployee(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/form/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setErrorMessage(message);
      } else {
        setEditEmployeeId(id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
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
    if (
      firstName === '' ||
      lastName === '' ||
      dateOfBirth === '' ||
      email === '' ||
      password === '' ||
      dni === ''
    ) {
      setErrorMessage('Please fill in all fields');
    } else {
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
        console.log(data);

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
          alert(msg);
        }
      } catch (error) {
        setErrorMessage(error.toString());
      }
    }
  }

  return (
    <section>
      <h3>Add admin</h3>
      <a className={styles.button} href="/employees">
        Back to list
      </a>
      <form className={styles.form}>
        <div className={styles.container}>
          <Input name="FirstName" type="text" value={firstName} onChange={setFirstName} />
          <Input name="LastName" type="text" value={lastName} onChange={setLastName} />
          <Input name="DateOfBirth" type="dale" value={dateOfBirth} onChange={setDateOfBirth} />
          <Input name="Email" type="email" value={email} onChange={setEmail} />
          <Input name="Password" type="password" value={password} onChange={setPassword} />
          <Input name="Dni" type="number" value={dni} onChange={setDni} />
        </div>
        <div className={styles.buttonContainer}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={
              !firstName || !lastName || !dateOfBirth || !email || !password || !dni || loading
            }
          >
            {loading && 'Loading...'}
            {!loading && requestType === 'POST' ? 'Add Employee' : 'Update Employee'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
