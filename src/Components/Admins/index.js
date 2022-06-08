import styles from './admins.module.css';
import { useState, useEffect } from 'react';

import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const URL = `${process.env.REACT_APP_API_URL}/admins`;

  const column = [
    { heading: 'First name', value: 'firstName' },
    { heading: 'Last name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Id', value: '_id' }
  ];

  useEffect(() => {
    async function fetchAdmins() {
      try {
        setLoading(true);
        const response = await fetch(`${URL}`);
        const { message, data, error } = await response.json();
        if (!error) {
          setAdmins(data);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  function handleDeleteAdmin(id) {
    setDeleteId(id);
    setIsOpen(true);
  }

  async function deleteAdmin(id) {
    const response = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    const responseJson = await response.json();
    if (responseJson.error) {
      alert('error');
    } else {
      setAdmins(admins.filter((adminsItem) => adminsItem._id !== id));
      setIsOpen(false);
    }
  }

  return (
    <section className={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Modal
            modalTitle="Are you sure you want to delete?"
            isOpen={isOpen}
            handleClose={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Button text="Yes" type="delete" handler={() => deleteAdmin(deleteId)} />
          </Modal>
          <h2>Admins</h2>
          <div className={styles.buttonContainer}>
            <Button text="Add Task" link={'/admins/form'} />
            <Search placeholder="Search admin" />
          </div>
          <Table data={admins} column={column} deleteItem={handleDeleteAdmin} entity="admins" />
        </>
      )}
    </section>
  );
};

export default Admins;
