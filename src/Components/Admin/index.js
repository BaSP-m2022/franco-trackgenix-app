import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import LoadingScreen from '../Shared/LoadingScreen';
import { useHistory } from 'react-router-dom';

function AdminForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [editAdminId, setEditAdminId] = useState('');
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState('Add Admin');

  useEffect(() => {
    async function fetchAdmin(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setMsg(message);
      } else {
        setEditAdminId(id);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPassword(data.password);
      }
    }
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
    if (adminId) {
      setEditAdminId(adminId);
      setRequestType('PUT');
      fetchAdmin(adminId);
      setTitle('Edit Admin');
    } else {
      setRequestType('POST');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setModalTitle('There was an error');
      setMsg('Please fill in all fields');
      setIsOpen(!isOpen);
      setRedirect(false);
    } else {
      try {
        setLoading(true);
        const URL =
          process.env.REACT_APP_API_URL +
          `/admins${requestType === 'POST' ? '' : `/${editAdminId}`}`;
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
          setModalTitle('There was an error');
          setMsg(data.message);
          setIsOpen(!isOpen);
          setRedirect(false);
        } else {
          setModalTitle('Success');
          setMsg(requestType === 'POST' ? 'Admin created' : 'Admin updated');
          setIsOpen(!isOpen);
          setRedirect(true);
        }
      } catch (error) {
        setMsg(error.toString());
      }
    }
  }

  const history = useHistory();
  const routeChange = () => {
    let path = `/admins`;
    history.push(path);
  };

  const ls = LoadingScreen();
  if (loading) {
    return ls;
  } else {
    return (
      <div className={styles.container}>
        <h3 className={styles.h3}>{title}</h3>
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
            <Button
              text={!loading && requestType === 'POST' ? 'Add Admin' : 'Update Admin'}
              handler={handleSubmit}
            />
            <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
              <p className={styles.message}>{msg}</p>
              <div>
                <Button text="OK" handler={redirect ? routeChange : () => setIsOpen(!isOpen)} />
              </div>
            </Modal>
          </div>
        </form>
      </div>
    );
  }
}

export default AdminForm;
