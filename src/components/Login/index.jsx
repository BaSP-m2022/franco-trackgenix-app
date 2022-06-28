/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/employees/actions';
import { login } from 'redux/auth/thunks';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Input from 'components/Shared/Input';
import Modal from 'components/Shared/Modal';
import Button from 'components/Shared/Button';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from './login.module.css';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('The email is invalid')
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
    .required()
});

const loginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const { handleSubmit, control } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function formHandleSubmit(data) {
    const body = JSON.stringify({
      email: data.email,
      password: data.password
    });
    dispatch(login(body));
  }

  const routeChange = () => {
    let path = `/home`;
    history.push(path);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <div className={styles.containerSec}>
      <h2 className={styles.formTitle}>Log In</h2>
      <form className={styles.form}>
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                name="Email"
                value={value}
                placeholder="Enter your email address"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                name="Password"
                type="password"
                value={value}
                placeholder="Enter your password"
                onChange={onChange}
                error={error?.message}
              />
            )}
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
          <Button text={'Log In'} handler={handleSubmit(formHandleSubmit)} />
        </div>
        <div>
          <Button text={'Sign in '} handler={null} />
        </div>
      </form>
    </div>
  );
};

export default loginForm;
