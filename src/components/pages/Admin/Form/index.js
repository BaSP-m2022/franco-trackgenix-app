import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Joi from 'joi';
import { postAdmin, putAdmin } from 'redux/admins/thunks';
import { clearError } from 'redux/admins/actions';
import { Input, Button, Modal, LoadingScreen } from 'components/Shared';
import { capitalizeFirstLetter } from 'utils/formatters';
import styles from './form.module.css';

const schema = Joi.object({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .message('First Name must have only letters')
    .min(3)
    .message('First Name must have at least 3 characters')
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .message('Last Name must have only letters')
    .min(3)
    .message('Last Name must have at least 3 characters')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(12)
    .pattern(/[a-zA-Z]/)
    .pattern(/[0-9]/)
    .required()
});

const AdminForm = () => {
  const { handleSubmit, control, setValue } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.admins.admin);
  const loading = useSelector((state) => state.admins.loading);
  const error = useSelector((state) => state.admins.error);
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (admin._id) {
      setValue('firstName', admin.firstName);
      setValue('lastName', admin.lastName);
      setValue('email', admin.email);
      setValue('password', admin.password);
      setRequestType('PUT');
    }
  }, [admin]);

  const routeChange = () => {
    let path = `/admins`;
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
      email: data.email,
      password: data.password
    });
    if (requestType === 'PUT') {
      setModalTitle('Admin Updated');
      setModalText('Admin has been updated');
      dispatch(putAdmin(admin._id, body));
      openModal();
    } else {
      setModalTitle('Admin Created');
      setModalText('Admin has been created');
      dispatch(postAdmin(body));
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

  const handleClose = () => {
    closeModal();
    dispatch(clearError());
  };

  return (
    <div className={styles.container}>
      <Modal modalTitle={error ? 'error' : modalTitle} isOpen={isOpen}>
        <p className={styles.message}>{error ? error : modalText}</p>
        <div>
          <Button text="OK" handler={!error ? routeChange : handleClose} />
        </div>
      </Modal>
      <h3 className={styles.h3}>{requestType === 'PUT' ? 'Update Admin' : 'Add Admin'}</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputs}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                className={styles.label}
                type="text"
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
            text={requestType === 'PUT' ? 'Update' : 'Save'}
            handler={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
