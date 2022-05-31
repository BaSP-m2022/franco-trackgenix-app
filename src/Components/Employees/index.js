import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/EmployeesList.jsx';

const Employees = () => {
  const [list, setList] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setList(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (_id) => {
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
        method: 'DELETE'
      });
      console.log(response);
      alert('Employee deleted');
    } catch (error) {
      console.error(error);
    }
    setList(list.filter((listItem) => listItem._id !== _id));
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        <List list={list} deleteItem={deleteItem} setList={setList} />
      </div>
      <a className={styles.button} href="/employees/form">
        Add New Employee
      </a>
    </section>
  );
};

export default Employees;
