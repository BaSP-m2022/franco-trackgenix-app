// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import styles from './form.module.css';

function SuperAdminsForm() {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [mailValue, setMailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [superAdmins, setSuperAdmin] = useState('');

  const onChangeNameInput = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeLastNameInput = (e) => {
    setLastNameValue(e.target.value);
  };
  const onChangeEmailInput = (e) => {
    setMailValue(e.target.value);
  };
  const onChangePasswordInput = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/super-admins/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: nameValue,
        lastName: lastNameValue,
        email: mailValue,
        password: passwordValue
      })
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <h2>Super Admins Form</h2>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label className={styles.container}>First Name</label>
          <input
            className={styles.input}
            id="name"
            name="name"
            required
            type="text"
            value={nameValue}
            onChange={onChangeNameInput}
          />
        </div>
        <div>
          <label className={styles.container}>Last Name</label>
          <input
            className={styles.input}
            id="lastName"
            name="lastName"
            required
            type="text"
            value={lastNameValue}
            onChange={onChangeLastNameInput}
          />
        </div>
        <div>
          <label className={styles.container}>E-Mail</label>
          <input
            className={styles.input}
            id="mail"
            name="mail"
            required
            type="text"
            value={mailValue}
            onChange={onChangeEmailInput}
          />
        </div>
        <div>
          <label className={styles.container}>Password</label>
          <input
            className={styles.input}
            id="password"
            name="password"
            required
            type="text"
            value={passwordValue}
            onChange={onChangePasswordInput}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </section>
  );
}

export default SuperAdminsForm;
