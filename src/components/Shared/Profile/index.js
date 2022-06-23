import styles from './profile.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/employees/actions';
import { putEmployee } from 'redux/employees/thunks';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { capitalizeFirstLetter } from 'utils/formatters';
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
  oldPassword: Joi.string()
    .min(8)
    .message('Password must have between 8 and 12 characters')
    .max(12)
    .message('Password must have between 8 and 12 characters')
    .pattern(/[a-zA-Z]/)
    .message('Password must have at least 1 letter')
    .pattern(/[0-9]/)
    .message('Password must have at least 1 number')
    .required(),
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
    .messages({ 'any.only': 'Passwords must match' }),
  dateOfBirth: Joi.date().max(moreThan18).message('You must be more than 18 years old').required()
});

const Profile = () => {
  const { handleSubmit, control, setValue } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      dni: '',
      email: '',
      password: '',
      rpassword: '',
      oldPassword: ''
    }
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const [msg, setMsg] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState('');

  const employee = useSelector((state) => state.employees.employee);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (employee?._id) {
      setValue('firstName', employee.firstName);
      setValue('lastName', employee.lastName);
      setValue('dateOfBirth', employee.dateOfBirth.slice(0, 10));
      setValue('dni', employee.dni);
      setValue('email', employee.email);
      setValue('password', employee.password);
      setValue('rpassword', employee.password);
      setValue('oldPassword', employee.password);
    }
  }, [employee]);

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

  const handleChangePassword = () => {
    setChangePassword(true);
    setValue('password', '');
    setValue('rpassword', '');
    setValue('oldPassword', '');
  };

  const onSubmit = (data) => {
    if (data.oldPassword === employee.password) {
      console.log('asdasd');
      const body = JSON.stringify({
        firstName: capitalizeFirstLetter(data.firstName),
        lastName: capitalizeFirstLetter(data.lastName),
        dni: data.dni,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth
      });
      dispatch(putEmployee(employee._id, body));
      setOldPasswordError('');
      setChangePassword(false);
      setModalTitle('Profile updated');
      setMsg('You have updated your profile successfully!');
      openModal();
    } else {
      setOldPasswordError('Password is incorrect');
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
    <section className={styles.container}>
      <Modal modalTitle={error ? 'Error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
        <p>{error ? error : msg}</p>
        <div>
          <Button
            text="OK"
            handler={() => {
              closeModal();
            }}
          />
        </div>
      </Modal>
      <h2 className={styles.subtitle}>Profile</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          name="email"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              name="Email"
              value={value}
              placeholder="Email"
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
        <h2 className={styles.subtitle}>Security</h2>
        {!changePassword ? (
          <div className={styles.changePasswordButton}>
            <Button text="Change password" handler={handleChangePassword} />
          </div>
        ) : (
          <div className={styles.passwordInputs}>
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  type="password"
                  name="Old password"
                  value={value}
                  placeholder="Old password"
                  onChange={onChange}
                  error={oldPasswordError ? oldPasswordError : error?.message}
                />
              )}
            />
            <Controller
              control={control}
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
              control={control}
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
        )}
      </form>

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
    </section>
  );
};

export default Profile;
