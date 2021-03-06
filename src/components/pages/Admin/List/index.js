import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { setAdmin } from 'redux/admins/actions';
import { Table, LoadingScreen, Modal, Button, Search } from 'components/Shared';
import styles from './list.module.css';

const Admins = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins.list);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminId, setAdminId] = useState('');
  const [filteredList, setFilteredList] = useState(admins);

  const column = [
    { heading: 'First name', value: 'firstName' },
    { heading: 'Last name', value: 'lastName' },
    { heading: 'Email', value: 'email' }
  ];

  useEffect(() => {
    if (!admins.length) {
      dispatch(getAdmins());
    }
    if (error) {
      openModal();
    }
  }, [error]);

  useEffect(() => {
    setFilteredList(
      admins.filter((item) => item.firstName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [admins, searchQuery]);

  const handleSetAdmin = (id) => {
    dispatch(setAdmin(id));
    history.push('/admins/form');
  };

  const buttonDelete = (id) => {
    setAdminId(id);
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section className={styles.container}>
      <Modal modalTitle={'Admins'} isOpen={isOpen}>
        <p>{error ? error : 'Are you sure to delete an admin?'}</p>
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
                  dispatch(deleteAdmin(adminId));
                  closeModal();
                }}
              />
              <Button text="No" handler={closeModal} />
            </div>
          )}
        </div>
      </Modal>
      <h2 className={styles.title}>Admins</h2>
      <div className={styles.buttons}>
        <Button
          text={'Add Admin'}
          handler={() => {
            dispatch(setAdmin());
            history.push('/admins/form');
          }}
        />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={'Search by first name'}
        />
      </div>
      <Table
        data={searchQuery.length ? filteredList : admins}
        column={column}
        deleteItem={buttonDelete}
        editItem={handleSetAdmin}
        buttons={2}
      />
    </section>
  );
};

export default Admins;
