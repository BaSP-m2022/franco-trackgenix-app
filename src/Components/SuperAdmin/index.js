import { useState, useEffect } from 'react';
import styles from './superAdmin.module.css';
import Input from './Info';

function SuperAdminForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [requestType, setRequestType] = useState('POST');
  const [editSuperAdminId, setEditSuperAdminId] = useState('');

  useEffect(() => {
    async function fetchSuperAdmin(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setErrorMessage(message);
      } else {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPassword(data.password);
      }
    }
    const params = new URLSearchParams(window.location.search);
    const superAdminId = params.get('id');
    if (superAdminId) {
      setEditSuperAdminId(superAdminId);
      setRequestType('PUT');
      fetchSuperAdmin(superAdminId);
    } else {
      setRequestType('POST');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setErrorMessage('All fields must be completed');
    } else {
      try {
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
          setErrorMessage(data.message);
        } else {
          setErrorMessage('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          const msg = requestType === 'POST' ? 'Super Admin created' : 'Super Admin updated';
          alert(msg);
        }
      } catch (error) {
        setErrorMessage(error.toString());
      }
    }
  }

  return (
    <section>
      <a href="/super-admins">Super Admin Home</a>
      <h3>Add Super admin</h3>
      <form className={styles.container}>
        <div className={styles.container}>
          <Input name="First Name" type="text" value={firstName} onChange={setFirstName} />
          <Input name="Last Name" type="text" value={lastName} onChange={setLastName} />
          <Input name="Email" type="email" value={email} onChange={setEmail} />
          <Input name="Password" type="text" value={password} onChange={setPassword} />
        </div>
        <div className={styles.container}>
          {errorMessage && <p>{errorMessage}</p>}
          <button className={styles.btn} onClick={handleSubmit}>
            {loading && 'Loading...'}
            {!loading && requestType === 'POST' ? 'Add Admin' : 'Update Admin'}
          </button>
        </div>
      </form>
    </section>
  );
}
export default SuperAdminForm;
