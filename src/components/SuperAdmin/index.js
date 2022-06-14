import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmin, putSuperAdmin } from '../../redux/superAdmins/thunks';
import { clearError } from '../../redux/superAdmins/actions';

import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import LoadingScreen from '../Shared/LoadingScreen';
import styles from './superAdmin.module.css';

const SuperAdminForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  const loading = useSelector((state) => state.superAdmins.loading);
  const error = useSelector((state) => state.superAdmins.error);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (superAdmin._id) {
      setFirstName(superAdmin.firstName);
      setLastName(superAdmin.lastName);
      setEmail(superAdmin.email);
      setPassword(superAdmin.password);
      setRequestType('PUT');
    }
  }, [error]);

  const routeChange = () => {
    let path = `/super-admins`;
    history.push(path);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      password
    });
    if (requestType === 'PUT') {
      setModalTitle('Super Admin Updated');
      setModalText('Super Admin has been updated');
      dispatch(putSuperAdmin(superAdmin._id, body));
      openModal();
    } else {
      setModalTitle('Super Admin Created');
      setModalText('Super Admin has been created');
      dispatch(postSuperAdmin(body));
      openModal();
    }
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
      <h3 className={styles.h3}>
        {requestType === 'PUT' ? 'Update Super Admin' : 'Add Super Admin'}
      </h3>
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
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text="Return"
            handler={() => {
              dispatch(clearError());
              routeChange();
            }}
          />
          <Button handler={handleSubmit} text={requestType === 'PUT' ? 'Update' : 'Save'} />
          <Modal modalTitle={error ? 'error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
            <p className={styles.message}>{error ? error : modalText}</p>
            <div>
              <Button text="OK" handler={!error ? routeChange : closeModal} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminForm;
