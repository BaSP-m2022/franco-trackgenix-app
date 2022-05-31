import { useState, useEffect } from 'react';
import './employee.module.css';
import AddEmployee from './components/AddItem/AddItem.jsx';

const Employee = () => {
  const [list, setList] = useState([]);
  const URL = `${process.env.REACT_APP_API_URL}/employees/form`;

  useEffect(async () => {
    try {
      const response = await fetch(URL, {
        method: 'GET'
      });
      const responseJson = await response.json();
      setList(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addEmployee = async ({ _id, firstName, lastName, birthDate, email, password, dni }) => {
    const newEmployee = {
      _id,
      firstName,
      lastName,
      birthDate,
      email,
      password,
      dni
    };
    setList([...list, newEmployee]);
  };

  return (
    <section>
      <AddEmployee addEmployee={addEmployee} />
      <a href="/employees">Back to list</a>
    </section>
  );
};

export default Employee;
