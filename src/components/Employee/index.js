import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import schema from './validations';
import { clearError } from 'redux/employees/actions';
import { addEmployee, putEmployee } from 'redux/employees/thunks';
import { capitalizeFirstLetter } from 'utils/formatters';
import Input from 'components/Shared/Input';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from './employee.module.css';

const EmployeeForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employees.employee);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  const [requestType, setRequestType] = useState('POST');
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [title, setTitle] = useState('Add Employee');

  const { handleSubmit, control, setValue } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      password: '',
      dateOfBirth: ''
    }
  });

  useEffect(() => {
    if (typeof employee === 'object' && employee._id) {
      setValue('firstName', employee.firstName);
      setValue('lastName', employee.lastName);
      setValue('dateOfBirth', employee.dateOfBirth.slice(0, 10));
      setValue('email', employee.email);
      setValue('password', employee.password);
      setValue('dni', employee.dni);
      setRequestType('PUT');
      setTitle('Edit Employee');
    }
  }, [error]);

  const routeChange = () => {
    let path = `/employees`;
    history.push(path);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    const body = JSON.stringify({
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      password: data.password,
      dni: data.dni
    });
    if (requestType === 'PUT') {
      dispatch(putEmployee(employee._id, body));
      setModalTitle('Employee updated');
      setMsg('Employee updated successfully!');
      openModal();
    } else {
      dispatch(addEmployee(body));
      setModalTitle('Employee created');
      setMsg('Employee created successfully!');
      openModal();
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
    <div className={styles.containerSec}>
      <h2 className={styles.formTitle}>{title}</h2>
      <form className={styles.form}>
        <div>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                name="First name"
                value={value}
                placeholder="First name"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                className={styles.label}
                type="text"
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
                name="Date Of Birth"
                type="date"
                value={value}
                placeholder="Enter your Birth date"
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
                name="Dni"
                type="number"
                value={value}
                placeholder="Enter your DNI"
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
                className={styles.label}
                type="email"
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
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                className={styles.label}
                type="password"
                name="Password"
                value={value}
                placeholder="Password"
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
          <Button
            text={!loading && requestType === 'POST' ? 'Save' : 'Update'}
            handler={handleSubmit(onSubmit)}
          />
          <Modal modalTitle={error ? 'Error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
            <p>{error ? error : msg}</p>
            <div>
              <Button
                text="OK"
                handler={() => {
                  closeModal();
                  if (!error) {
                    routeChange();
                  }
                }}
              />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
