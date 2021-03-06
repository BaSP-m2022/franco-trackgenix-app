import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from 'redux/auth/thunks';
import { clearError } from 'redux/employees/actions';
import { setAuthentication } from 'redux/auth/actions';
import { putEmployee } from 'redux/employees/thunks';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { capitalizeFirstLetter } from 'utils/formatters';
import { logOut } from 'redux/auth/actions';
import Joi from 'joi';
import Modal from 'components/Shared/Modal';
import Input from 'components/Shared/Input';
import Button from 'components/Shared/Button';
import LoadingScreen from 'components/Shared/LoadingScreen';

const now = Date.now();
const moreThan18 = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);
const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .message('First Name must have at least 3 characters')
    .max(30)
    .message('First Name must be less than 30 characters')
    .regex(/^[a-zA-Z]+$/)
    .message('First Name must have only letters')
    .required(),
  lastName: Joi.string()
    .min(3)
    .message('Last Name must have at least 3 characters')
    .max(30)
    .message('Last Name must be less than 30 characters')
    .regex(/^[a-zA-Z]+$/)
    .message('Last Name must have only letters')
    .required(),
  dni: Joi.string()
    .regex(/^[0-9]+$/)
    .message('You can use only integers numbers')
    .min(7)
    .message('DNI must have between 7 and 8 characters')
    .max(8)
    .message('DNI must have between 7 and 8 characters')
    .optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Your email must be a valid email')
    .required(),
  dateOfBirth: Joi.date().max(moreThan18).message('You must be more than 18 years old').required()
});
const schemaPassword = Joi.object({
  password: Joi.string()
    .min(8)
    .message('Password must have between 8 and 12 characters')
    .max(12)
    .message('Password must have between 8 and 12 characters')
    .pattern(/[a-zA-Z]/)
    .message('Password must have at least 1 letter')
    .pattern(/[0-9]/)
    .message('Password must have at least 1 number')
    .required(),
  rpassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords must match' })
});

const EmployeeProfile = () => {
  const { handleSubmit, control, setValue } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      dni: ''
    }
  });
  const { handleSubmit: handleSubmitPassword, control: controlPassword } = useForm({
    resolver: joiResolver(schemaPassword),
    defaultValues: {
      password: '',
      rpassword: ''
    }
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const [msg, setMsg] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState('');

  const loading = useSelector((state) => state.employees.loading);
  const errorEmployees = useSelector((state) => state.employees.error);
  const errorFirebase = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (employee?._id) {
      setValue('firstName', employee.firstName);
      setValue('lastName', employee.lastName);
      setValue('dateOfBirth', employee.dateOfBirth.slice(0, 10));
      setValue('dni', employee.dni);
      setValue('email', employee.email);
    }
  }, [employee]);

  useEffect(() => {
    setEmployee(JSON.parse(sessionStorage.getItem('loggedUser')));
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const routeChange = () => {
    let path = `/employees`;
    history.push(path);
  };

  const onSubmit = (data) => {
    const body = JSON.stringify({
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
      dni: data.dni,
      email: data.email,
      dateOfBirth: data.dateOfBirth
    });
    dispatch(putEmployee(employee._id, body));
    if (errorEmployees) {
      setModalTitle('Database Error');
      setMsg(errorEmployees);
    } else {
      setModalTitle('Profile updated');
      setMsg('You have updated your profile successfully!');
      const object = JSON.parse(sessionStorage.getItem('loggedUser'));
      const bodyParsed = JSON.parse(body);
      object.firstName = bodyParsed.firstName;
      object.lastName = bodyParsed.lastName;
      sessionStorage.setItem('loggedUser', JSON.stringify(object));
      dispatch(setAuthentication(false));
      dispatch(setAuthentication(true));
    }
    openModal();
  };

  const onSubmitPassword = (data) => {
    const body = {
      password: data.password
    };
    dispatch(updatePassword(body));
    if (errorFirebase) {
      setModalTitle('Password Change Error');
      setMsg('You need to log again in the system');
      openModal();
    } else {
      setModalTitle('Password updated');
      setMsg('You have updated your password successfully!');
      openModal();
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <section className={styles.container}>
      <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={closeModal}>
        <p>{msg}</p>
        <div>
          <Button
            text="OK"
            handler={() => {
              closeModal();
              if (errorFirebase) {
                dispatch(logOut());
                history.push('/login');
              }
            }}
          />
        </div>
      </Modal>
      <form className={`${styles.profile} ${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <h2 className={styles.subtitle}>Profile</h2>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                value={value}
                onChange={onChange}
                error={error?.message}
                name="First name"
                placeholder="First name"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                name="Last name"
                value={value}
                placeholder="Last name"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="date"
                name="Date of birth"
                value={value}
                placeholder="Date of birth"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dni"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="number"
                name="DNI"
                value={value}
                placeholder="DNI"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            text="Return"
            handler={() => {
              dispatch(clearError());
              routeChange();
            }}
          />
          <Button text="Edit profile" className={styles.button} handler={handleSubmit(onSubmit)} />
        </div>
      </form>
      <form
        className={`${styles.security} ${styles.form}`}
        onSubmit={handleSubmitPassword(onSubmitPassword)}
      >
        <div className={styles.inputsContainer}>
          <h2 className={styles.subtitle}>Security</h2>
          <Controller
            control={controlPassword}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="password"
                name="New password"
                value={value}
                placeholder="New password"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={controlPassword}
            name="rpassword"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="password"
                name="Repeat password"
                value={value}
                placeholder="Repeat password"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className={styles.changePasswordButton}>
          <Button text="Update Password" />
        </div>
      </form>
    </section>
  );
};

export default EmployeeProfile;
