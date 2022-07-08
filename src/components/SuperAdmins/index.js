import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from '../../redux/superAdmins/thunks';
import { setSuperAdmin } from '../../redux/superAdmins/actions';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import styles from './super-admins.module.css';

const SuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const superAdmins = useSelector((state) => state.superAdmins.list);
  const loading = useSelector((state) => state.superAdmins.loading);
  const error = useSelector((state) => state.superAdmins.error);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [superAdminId, setSuperAdminId] = useState('');
  const [filteredList, setFilteredList] = useState(superAdmins);

  const column = [
    { heading: 'First name', value: 'firstName' },
    { heading: 'Last name', value: 'lastName' },
    { heading: 'Email', value: 'email' }
  ];

  useEffect(() => {
    if (!superAdmins.length) {
      dispatch(getSuperAdmins());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      superAdmins.filter((item) => item.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [superAdmins, searchQuery]);

  const handleSetSuperAdmin = (id) => {
    dispatch(setSuperAdmin(id));
    history.push('/super-admins/form');
  };

  const buttonDelete = (id) => {
    setSuperAdminId(id);
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingDiv}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <section className={styles.containerSuperAdmin}>
      <Modal modalTitle={'Super Admins'} isOpen={isOpen}>
        <p>{error ? error : 'Are you sure to delete a Super Admin?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={closeModal} />
            </div>
          ) : (
            <div>
              <Button
                text="Yes"
                type="delete"
                handler={() => {
                  dispatch(deleteSuperAdmin(superAdminId));
                  closeModal();
                }}
              />
              <Button text="No" handler={closeModal} />
            </div>
          )}
        </div>
      </Modal>
      <h2>Super Admins</h2>
      <div className={styles.btnSearchDiv}>
        <Button
          text={'Add Super Admin'}
          handler={() => {
            dispatch(setSuperAdmin());
            history.push('/super-admins/form');
          }}
        />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={'Search by first name'}
        />
      </div>
      <Table
        data={searchQuery.length ? filteredList : superAdmins}
        column={column}
        deleteItem={buttonDelete}
        editItem={handleSetSuperAdmin}
        buttons={true}
      />
    </section>
  );
};

export default SuperAdmins;
