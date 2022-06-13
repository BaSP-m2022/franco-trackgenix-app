import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Shared/Table';
import LoadingScreen from '../Shared/LoadingScreen';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
// import Search from '../Shared/Search-bar';
import styles from './admins.module.css';
import { getAdmins, deleteAdmins } from '../../redux/admins/thunks';

const Admins = () => {
  // const [untouchedData, setUntouchedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  const column = [
    { heading: 'First name', value: 'firstName' },
    { heading: 'Last name', value: 'lastName' },
    { heading: 'Email', value: 'email' },
    { heading: 'Id', value: '_id' }
  ];

  const entity = 'admins';

  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);

  useEffect(() => {
    dispatch(getAdmins());
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const handleDeleteAdmin = (admin) => {
    dispatch(deleteAdmins(admin));
  };

  // const deleteButton = () => {
  //   setIsOpen(!isOpen);
  //   isDelete = true;
  // };

  // function setBothDatas(data) {
  //   setData(data);
  //   setUntouchedData(data);
  // }

  // function search(value) {
  //   setSearchQuery(value);
  //   const result = untouchedData.filter((employee) => employee._id.includes(value));
  //   setData(result);
  // }

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
              <Button text="Yes" type="delete" handler={() => setIsOpen(!isOpen)} />
              <Button text="No" handler={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </Modal>
      <h2>Admins</h2>
      <div className={styles.buttonContainer}>
        <Button text={'Add Admin'} link={'/admins/form'} />
        {/* <Search searchQuery={searchQuery} setSearchQuery={search} placeholder={'Search admin'} /> */}
      </div>
      <Table data={admins} column={column} deleteItem={handleDeleteAdmin} entity={entity} />
    </section>
  );
};

export default Admins;
