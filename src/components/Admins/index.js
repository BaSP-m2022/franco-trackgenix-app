import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../redux/admins/thunks';
import { setAdmin } from '../../redux/admins/actions';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Search from '../Shared/Search-bar';
import styles from './admins.module.css';

const Admins = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const admins = useSelector((state) => state.admins.list);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [idDel, setIdDel] = useState('');
  const [filteredList, setFilteredList] = useState(admins);

  const column = [
    { heading: 'First name', value: 'firstName' },
    { heading: 'Last name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Id', value: '_id' }
  ];

  useEffect(() => {
    dispatch(getAdmins());
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const handleSetAdmin = (id) => {
    dispatch(setAdmin(id));
    history.push('/admins/form');
  };

  const buttonDelete = (id) => {
    setIdDel(id);
    setIsOpen(!isOpen);
  };

  const handleDeleteAdmin = (admin) => {
    dispatch(deleteAdmin(admin));
  };

  const search = (value) => {
    setSearchQuery(value);
    setFilteredList(admins.filter((employee) => employee._id.includes(searchQuery)));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Modal
        modalTitle={'Admins'}
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p>{error ? error : 'Are you sure to delete an admin?'}</p>
        <div>
          {error ? (
            <div>
              <Button text="Close" handler={() => setIsOpen(false)} />
            </div>
          ) : (
            <div>
              <Button
                text="Yes"
                type="delete"
                handler={() => {
                  handleDeleteAdmin(idDel);
                  setIsOpen(!isOpen);
                }}
              />
              <Button text="No" handler={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </Modal>
      <h2>Admins</h2>
      <div className={styles.buttonContainer}>
        <Button text={'Add Admin'} link={'/admins/form'} />
        <Search searchQuery={searchQuery} setSearchQuery={search} placeholder={'Search admin'} />
      </div>
      <Table
        data={searchQuery.length == 0 ? admins : filteredList}
        column={column}
        deleteItem={buttonDelete}
        editItem={handleSetAdmin}
      />
    </section>
  );
};

export default Admins;
