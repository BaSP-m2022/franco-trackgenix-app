/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmins, putAdmins } from '../../redux/admins/thunks';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import styles from './admin.module.css';

const AdminForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.admin);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);

  useEffect(() => {
    if (admin._id) {
      setFirstName(admin.firstName);
      setLastName(admin.lastName);
      setEmail(admin.email);
      setPassword(admin.password);
      setRequestType('PUT');
    }
  }, [error]);

  const handleAddAdmin = (newAdmin) => {
    dispatch(addAdmins(newAdmin));
  };

  const handleEditAdmin = (id, admin) => {
    dispatch(putAdmins(id, admin));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password
      });
      if (requestType === 'PUT') {
        setModalTitle('Admin Updated');
        setModalText('Admin has been updated');
        handleEditAdmin(admin._id, body);
        setIsOpen(!isOpen);
      } else {
        setModalTitle('Admin Created');
        setModalText('Admin has been created');
        handleAddAdmin(body);
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const history = useHistory();
  const routeChange = () => {
    let path = `/admins`;
    history.push(path);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>{requestType === 'PUT' ? 'Update Admin' : 'Add Admin'}</h3>
      <form className={styles.form}>
        <div className={styles.inputs}>
          <Input
            name="First Name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <Input
            name="Last Name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={setLastName}
          />
          <Input
            name="Email"
            type="email"
            placeholder="mail@example.com"
            value={email}
            onChange={setEmail}
          />
          <Input
            name="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Return" handler={routeChange} />
          <Button handler={handleSubmit} text={requestType === 'PUT' ? 'Update' : 'Save'} />
          <Modal
            modalTitle={error ? 'error' : modalTitle}
            isOpen={isOpen}
            handleClose={() => setIsOpen(!isOpen)}
          >
            <p className={styles.message}>{error ? error : modalText}</p>
            <div>
              <Button text="OK" handler={!error ? routeChange : () => setIsOpen(!isOpen)} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
