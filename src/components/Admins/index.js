import styles from './admins.module.css';
import { useState, useEffect } from 'react';

import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

const Admins = () => {
  const [data, setData] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
          setBothDatas(data);
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

  function setBothDatas(data) {
    setData(data);
    setUntouchedData(data);
  }

  function search(value) {
    setSearchQuery(value);
    const result = untouchedData.filter((employee) => employee._id.includes(value));
    setData(result);
  }

  async function deleteAdmin(id) {
    const response = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    const responseJson = await response.json();
    if (responseJson.error) {
      alert('error');
    } else {
      setBothDatas(data.filter((item) => item._id !== id));
      setIsOpen(false);
    }
  }

  return (
    <section className={styles.container}>
      {loading ? (
        <div>
          <LoadingScreen />
        </div>
      ) : (
        <>
          <Modal
            modalTitle="Admin Delete"
            isOpen={isOpen}
            handleClose={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div>
              <p>Are you sure you want to delete admin?</p>
            </div>
            <Button text="Yes" type="delete" handler={() => deleteAdmin(deleteId)} />
            <Button text="No" handler={() => setIsOpen(false)} />
          </Modal>
          <h2>Admins</h2>
          <div className={styles.buttonContainer}>
            <Button text="Add Admin" link={'/admins/form'} />
            <Search placeholder="Search admin" searchQuery={searchQuery} setSearchQuery={search} />
          </div>
          <Table data={data} column={column} deleteItem={handleDeleteAdmin} entity="admins" />
        </>
      )}
    </section>
  );
};

export default Admins;
