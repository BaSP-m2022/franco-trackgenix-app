import { useEffect, useState } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmin, putSuperAdmin } from 'redux/superAdmins/thunks';
import { Controller, useForm } from 'react-hook-form';
import { clearError } from 'redux/superAdmins/actions';
import Input from 'components/Shared/Input';
import Modal from 'components/Shared/Modal';
import Button from 'components/Shared/Button';
import LoadingScreen from 'components/Shared/LoadingScreen';
import { capitalizeFirstLetter } from 'utils/formatters';
import styles from './superAdmin.module.css';

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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Your email must be a valid email')
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

const SuperAdminForm = () => {
  const { handleSubmit, control, setValue } = useForm({
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

  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  const loading = useSelector((state) => state.superAdmins.loading);
  const error = useSelector((state) => state.superAdmins.error);
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    if (superAdmin._id) {
      setValue('firstName', superAdmin.firstName);
      setValue('lastName', superAdmin.lastName);
      setValue('email', superAdmin.email);
      setValue('password', superAdmin.password);
      setRequestType('PUT');
    }
  }, [superAdmin]);

  const routeChange = () => {
    let path = `/super-admins`;
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
      setModalTitle('Super Admin Updated');
      setModalText('Super Admin has been updated');
      dispatch(putSuperAdmin(superAdmin._id, body));
      openModal();
    } else {
      setModalTitle('Super Admin Created');
      setModalText('Super Admin has been created');
      dispatch(postSuperAdmin(body));
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
    <div className={styles.container}>
      <h3 className={styles.h3}>
        {requestType === 'PUT' ? 'Update Super Admin' : 'Add Super Admin'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                type="text"
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
          <Button text={requestType === 'PUT' ? 'Update' : 'Save'} />
          <Modal modalTitle={error ? 'error' : modalTitle} isOpen={isOpen} handleClose={closeModal}>
            <p className={styles.message}>{error ? error : modalText}</p>
            <div>
              <Button text="OK" handler={!error ? routeChange : closeModal} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminForm;
