import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/employees/actions';
import { login } from 'redux/auth/thunks';
import { getProjects } from 'redux/projects/thunks';
import { Input, Modal, Button, LoadingScreen } from 'components/Shared';
import Joi from 'joi';
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

  const projects = useSelector((state) => state.projects.list);
  const loading = useSelector((state) => state.auth.loading);
  const authenticated = useSelector((state) => state.auth.authenticated);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    const role = JSON.parse(sessionStorage.getItem('loggedUser'))?.role;
    const idEmployee = JSON.parse(sessionStorage.getItem('loggedUser'))?._id;
    if (role === 'EMPLOYEE') {
      dispatch(getProjects(`employees.employeeId=${idEmployee}`));
    }
  }, [authenticated]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('loggedUser'))?.token;
    const role = JSON.parse(sessionStorage.getItem('loggedUser'))?.role;
    const idEmployee = JSON.parse(sessionStorage.getItem('loggedUser'))?._id;
    if (
      projects.find((project) =>
        project.employees.map((employee) => {
          if (employee.employeeId._id === idEmployee && employee.role === 'PM') return true;
        })
      )
    )
      sessionStorage.setItem('isPM', true);
    if (token) history.push(`${role ? `${role.toLowerCase()}s` : ''}/home`);
  }, [projects]);

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
    <section className={styles.containerSec}>
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
            type="button"
            text="Return"
            handler={() => {
              dispatch(clearError());
              history.push('home');
            }}
          />
          <Button text={'Log In'} handler={handleSubmit(formHandleSubmit)} />
        </div>
        <div>
          <Button
            type="button"
            text={`Don't have an account? Sign up`}
            handler={() => history.push('/signup')}
          />
        </div>
      </form>
    </section>
  );
};

export default loginForm;
