import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postAdmin, putAdmin } from 'redux/admins/thunks';
import { clearError } from 'redux/admins/actions';
import Input from 'components/Shared/Input';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from 'components/Admin/admin.module.css';

const AdminForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.admins.admin);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (admin._id) {
      setFirstName(admin.firstName);
      setLastName(admin.lastName);
      setEmail(admin.email);
      setPassword(admin.password);
      setRequestType('PUT');
    }
  }, [error]);

  const routeChange = () => {
    let path = `/admins`;
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
      setModalTitle('Admin Updated');
      setModalText('Admin has been updated');
      dispatch(putAdmin(admin._id, body));
      openModal();
    } else {
      setModalTitle('Admin Created');
      setModalText('Admin has been created');
      dispatch(postAdmin(body));
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

export default AdminForm;
