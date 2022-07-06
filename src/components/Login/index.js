import { useState, useEffect } from 'react';
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
  password: Joi.string().required()
});

const loginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) history.push('/home');
  }, [authenticated]);

  useEffect(() => {
    if (error) openModal();
  }, [error]);

  const { handleSubmit, control } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const formHandleSubmit = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password
      })
    );

    // if (error) {
    //   openModal();
    // } else {
    //   console.log('mefuiahome', error);
    //   // history.push('home');
    // }
  };

  const openModal = () => {
    setIsOpen(true);
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
      <Modal modalTitle={'Login error'} isOpen={isOpen} handleClose={closeModal}>
        <p>{error}</p>
        <div>
          <Button
            text="OK"
            handler={() => {
              dispatch(clearError());
              closeModal();
            }}
          />
        </div>
      </Modal>
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
              history.push('home');
            }}
          />
          <Button text={'Log In'} handler={handleSubmit(formHandleSubmit)} />
        </div>
        <div>
          <Button text={`Don't have an account? Sign up`} handler={() => history.push('/signup')} />
        </div>
      </form>
    </div>
  );
};

export default loginForm;
