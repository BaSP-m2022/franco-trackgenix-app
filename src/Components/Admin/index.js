import { useState } from 'react';
import styles from './admin.module.css';
import Input from './Input';

function AdminForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // const [requestType, setRequestType] = useState('POST');
  //  const [editAdminId, setEditAdminId] = useState('');
  const requestType = 'POST';
  const editAdminId = '';
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
        console.log('data', data);

        setLoading(false);

        if (data.error) {
          setErrorMessage(data.message);
        } else {
          alert('Admin added successfully');
          setErrorMessage('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.log('error', error);
        // setErrorMessage(error);
      }
    }
  }

  return (
    <section>
      <a href="/admins">Admin Home</a>
      <h3>Add admin</h3>
      <form className={styles.addForm}>
        <div className={styles.addInputsContainer}>
          <Input name="First Name" type="text" value={firstName} onChange={setFirstName} />
          <Input name="Last Name" type="text" value={lastName} onChange={setLastName} />
          <Input name="Email" type="email" value={email} onChange={setEmail} />
          <Input name="Password" type="text" value={password} onChange={setPassword} />
        </div>
        <div className={styles.addButtonContainer}>
          {errorMessage && <p>{errorMessage}</p>}
          <button className={styles.addButton} onClick={handleSubmit}>
            {loading && 'Loading...'}
            {!loading && requestType === 'POST' ? 'Add Admin' : 'Update Admin'}
          </button>
        </div>
      </form>
    </section>
  );
}
export default AdminForm;
