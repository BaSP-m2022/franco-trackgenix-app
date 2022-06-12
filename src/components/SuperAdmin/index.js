import { useState, useEffect } from 'react';
import styles from './superAdmin.module.css';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../Shared/LoadingScreen';

const SuperAdminForm = () => {
  const [loading, setLoading] = useState(false);

  const [requestType, setRequestType] = useState('POST');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [editSuperAdminId, setEditSuperAdminId] = useState('');
  const history = useHistory();

  const [modalTitle, setModalTitle] = useState('');

  const routeChange = () => {
    let path = `/super-admins`;
    history.push(path);
  };

  useEffect(() => {
    async function fetchId(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setMessage(message);
      } else {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPassword(data.password);
        setButtonText('Update Super Admin');
      }
    }
    const params = new URLSearchParams(window.location.search);
    const superAdminId = params.get('id');
    if (superAdminId) {
      setEditSuperAdminId(superAdminId);
      setRequestType('PUT');
      fetchId(superAdminId);
    } else {
      setRequestType('POST');
      setButtonText('Save Super Admin');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const URL =
      process.env.REACT_APP_API_URL +
      `/super-admins${requestType === 'POST' ? '' : `/${editSuperAdminId}`}`;

    const response = await fetch(URL, {
      method: requestType,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setModalTitle('Validation Error');
      setMessage(data.message);
      setIsOpen(true);
    } else {
      setModalTitle(requestType === 'POST' ? 'Super Admin Created' : 'Super Admin Updated');
      setMessage(
        requestType === 'POST'
          ? ' The Super Admin has been created'
          : 'The Super Admin has been updated'
      );
      setRedirect(true);
      setIsOpen(true);
    }
  }
  if (loading) {
    return (
      <div className={styles.loadingDiv}>
        <LoadingScreen loading={loading} />
      </div>
    );
  }

  return (
    <section className={styles.sectionSuperAdmin}>
      <Modal
        isOpen={isOpen}
        handleClose={
          redirect
            ? routeChange
            : () => {
                setIsOpen(!isOpen);
              }
        }
        modalTitle={modalTitle}
      >
        <p>{message}</p>
        <div>
          <Button text={'Ok'} handler={redirect ? routeChange : () => setIsOpen(!isOpen)} />
        </div>
      </Modal>
      <h2>Add Super admin</h2>
      <form className={styles.form}>
        <Input
          name={'First Name'}
          placeholder={'Enter your first name'}
          onChange={setFirstName}
          value={firstName}
        />
        <Input
          name={'Last Name'}
          placeholder={'Enter your last name'}
          onChange={setLastName}
          value={lastName}
        />
        <Input
          name={'Email'}
          type={'email'}
          placeholder={'Enter the Email'}
          onChange={setEmail}
          value={email}
        />
        <Input
          name={'Password'}
          type={'password'}
          placeholder={'Enter the Password'}
          onChange={setPassword}
          value={password}
        />
        <div className={styles.superAdminDiv}>
          <Button text={'Return'} handler={routeChange} />
          <Button text={buttonText} handler={handleSubmit} />
        </div>
      </form>
    </section>
  );
};
export default SuperAdminForm;
