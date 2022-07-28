import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { clearError } from 'redux/employees/actions';
import { addEmployee, putEmployee } from 'redux/employees/thunks';
import { capitalizeFirstLetter } from 'utils/formatters';
import { Input, Button, Modal, LoadingScreen } from 'components/Shared';
import schema from './validations';
import styles from './form.module.css';

const EmployeeForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employees.employee);
  const loading = useSelector((state) => state.employees.loading);
  const errorR = useSelector((state) => state.employees.error);

  const [requestType, setRequestType] = useState('POST');
  const [modalText, setModalText] = useState('');
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
      setValue('password', '1234567a');
      setValue('dni', employee.dni);
      setRequestType('PUT');
      setTitle('Edit Employee');
    }
  }, [employee]);

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
      setModalText('Employee updated successfully!');
      openModal();
    } else {
      dispatch(addEmployee(body));
      setModalTitle('Employee created');
      setModalText('Employee created successfully!');
      openModal();
    }
  };

  const handleClose = () => {
    closeModal();
    dispatch(clearError());
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <Modal modalTitle={errorR ? 'Error' : modalTitle} isOpen={isOpen}>
        <p>{errorR ? errorR : modalText}</p>
        <div>
          <Button text="OK" handler={!errorR ? routeChange : handleClose} />
        </div>
      </Modal>
      <h3 className={styles.title}>{title}</h3>
      <form className={styles.form}>
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
              name="DNI"
              type="text"
              value={value}
              placeholder="Enter your DNI"
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        {requestType === 'POST' && (
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="email"
                name="Email"
                value={value}
                placeholder="Email"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        )}
        {requestType === 'POST' && (
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                type="password"
                name="Password"
                value={value}
                placeholder="Password"
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        )}
        <div className={styles.buttons}>
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
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
