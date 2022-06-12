import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './super-admins.module.css';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import { getSuperAdmins } from '../../redux/superAdmins/thunks';

function SuperAdmins() {
  const [untouchedData, setUntouchedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState('');
  const [search, setSearch] = useState();
  const column = [
    { heading: 'Id', value: '_id' },
    { heading: 'First Name', value: 'firstName' },
    { heading: 'Last Name', value: 'lastName' },
    { heading: 'Email', value: 'email' }
  ];
  const entity = 'super-admins';

  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmins.list);
  const loading = useSelector((state) => state.superAdmins.loading);
  const error = useSelector((state) => state.superAdmins.error);

  useEffect(() => {
    dispatch(getSuperAdmins());
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const setSearchQuery = (value) => {
    setSearch(value);
  };

  const openModal = (id) => {
    setToBeDeleted(id);
    setIsOpen(true);
  };

  const deleteSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
    setUntouchedData(untouchedData.filter((superAdmin) => superAdmin._id !== toBeDeleted));
  };

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
          placeholder={'Insert Super-Admin Name'}
        />
      </div>
      {<Table data={superAdmins} deleteItem={openModal} column={column} entity={entity} />}
    </section>
  );
}

export default SuperAdmins;
