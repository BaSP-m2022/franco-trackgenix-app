import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';

function SuperAdmins() {
  const [dataTable, setDataTable] = useState([]);
  const [untouchedData, setUntouchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const entity = 'Super Admins';
  const [search, setSearch] = useState();

  const setSearchQuery = (value) => {
    setSearch(value);
    setDataTable(
      untouchedData.filter((superAdmin) => superAdmin.firstName.toLowerCase().includes(value))
    );
  };

  const openModal = (id) => {
    setToBeDeleted(id);
    setIsOpen(true);
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      setDataTable(data.data);
      setUntouchedData(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperAdmin = async (id) => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    const res = await response.json();
    if (res.data.error) {
      setIsOpen(false);
      setLoading(false);
    } else {
      setDataTable([...dataTable.filter((admin) => admin._id !== id)]);
      setIsOpen(false);
      setLoading(false);
    }
  };

  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'First Name', value: 'firstName' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Password', value: 'password' }
  ];
  if (loading) {
    return (
      <div className={styles.loadingDiv}>
        <LoadingScreen />;
      </div>
    );
  }
  return (
    <section className={styles.containerSuperAdmin}>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(!isOpen)}
        modalTitle={'Delete Super Admin'}
      >
        <p>Do you Wish to delete the Super Admin?</p>
        <div>
          <Button type={'delete'} handler={() => deleteSuperAdmin(toBeDeleted)} text={'Yes'} />
          <Button handler={() => setIsOpen(!isOpen)} text={'No'} />
        </div>
      </Modal>
      <h2>Super Admins</h2>
      <div className={styles.btnSearchDiv}>
        <Button link={'/super-admins/form'} text={'Add Super Admin'} />
        <Search
          searchQuery={search}
          setSearchQuery={setSearchQuery}
          placeholder={'Insert Super Admin Name'}
        />
      </div>
      <Table data={dataTable} column={column} deleteItem={openModal} entity={entity} />
    </section>
  );
}

export default SuperAdmins;
