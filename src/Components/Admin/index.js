import { useState, useEffect } from 'react';
import styles from './admin.module.css';
import Input from './Input';

function AdminForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [requestType, setRequestType] = useState('POST');
  const [editAdminId, setEditAdminId] = useState('');

  useEffect(() => {
    async function fetchAdmin(id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
      const { message, data, error } = await response.json();
      if (error) {
        setErrorMessage(message);
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
    } else {
      setRequestType('POST');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '' || password === '') {
      setErrorMessage('Please fill in all fields');
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
          setErrorMessage(data.message);
        } else {
          const msg = requestType === 'POST' ? 'Admin created' : 'Admin updated';
          setErrorMessage('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          alert(msg);
        }
      } catch (error) {
        setErrorMessage(error.toString());
      }
    }
  }

  return (
    <section className={styles.section}>
      <a className={styles.a} href="/admins">
        &#10094; Admin list
      </a>
      <h3 className={styles.h3}>Admin form</h3>
      <form className={styles.form}>
        <div className={styles.container}>
          <Input name="First Name" type="text" value={firstName} onChange={setFirstName} />
          <Input name="Last Name" type="text" value={lastName} onChange={setLastName} />
          <Input name="Email" type="email" value={email} onChange={setEmail} />
          <Input name="Password" type="text" value={password} onChange={setPassword} />
        </div>
        <div className={styles.buttonContainer}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={!firstName || !lastName || !email || !password || loading}
          >
            {loading && 'Loading...'}
            {!loading && requestType === 'POST' ? 'Add Admin' : 'Update Admin'}
          </button>
        </div>
      </form>
    </section>
  );
}
export default AdminForm;
