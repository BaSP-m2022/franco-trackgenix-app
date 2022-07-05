import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/employees/actions';
import { addEmployee } from 'redux/employees/thunks';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Input from 'components/Shared/Input';
import Modal from 'components/Shared/Modal';
import Button from 'components/Shared/Button';
import LoadingScreen from 'components/Shared/LoadingScreen';
import styles from './signup.module.css';

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
  dateOfBirth: Joi.date().max(moreThan18).message('You must be more than 18 years old').required()
});

const signupForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  const { handleSubmit, control } = useForm({
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

  function formHandleSubmit(data) {
    const body = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      dni: data.dni,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth
    });
    dispatch(addEmployee(body));
    setModalTitle('Employee Sign Up');
    setMsg('Employee created successfully!');
    openModal();
  }

  const routeChange = () => {
    let path = `/home`;
    history.push(path);
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
      <h2 className={styles.formTitle}>Employee Sign Up</h2>
      <form className={styles.form}>
        <div>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                name="First Name"
                value={value}
                placeholder="Enter your First Name"
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
                name="Last Name"
                value={value}
                placeholder="Enter your Last Name"
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
          <Button text={'Sign Up'} handler={handleSubmit(formHandleSubmit)} />
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
        <div>
          <Button text={'Already have an account? Log in '} handler={null} />
        </div>
      </form>
    </div>
  );
};

export default signupForm;
