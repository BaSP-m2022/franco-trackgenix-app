import { useState } from 'react';
//import styles from './add-item.module.css';

const AddEmployee = ({ addItem }) => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    dni: ''
  });

  const unChange = (e) => {
    console.log('evento', e);
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(employeeInput);
    setEmployeeInput({
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      password: '',
      dni: ''
    });
  };

  return (
    <div>
      <div>
        <h2>Add New Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>firstName</label>
          <input type="text" name="firstName" value={employeeInput.firstName} onChange={unChange} />
        </div>
        <div>
          <label>lastName</label>
          <input type="text" name="lastName" value={employeeInput.lastName} onChange={unChange} />
        </div>
        <div>
          <label>birthDate</label>
          <input type="date" name="birthDate" value={employeeInput.birthDate} onChange={unChange} />
        </div>
        <div>
          <label>email</label>
          <input type="text" name="email" value={employeeInput.email} onChange={unChange} />
        </div>
        <div>
          <label>password</label>
          <input type="text" name="password" value={employeeInput.password} onChange={unChange} />
        </div>
        <div>
          <label>dni</label>
          <input type="text" name="dni" value={employeeInput.dni} onChange={unChange} />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
