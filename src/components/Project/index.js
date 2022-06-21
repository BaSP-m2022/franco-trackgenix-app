/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styles from './Project.module.css';
import Input from 'components/Shared/Input';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import LoadingScreen from 'components/Shared/LoadingScreen';
import Select from 'components/Shared/SelectDropdown';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from 'redux/projects/actions';
import { postProject, putProject } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { useForm, Controller, useFieldArray, appendErrors } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const mapEmployees = (employees) => {
  return employees.map((employee) => {
    const employeeId =
      typeof employee.employeeId == 'object' ? employee.employeeId._id : employee.employeeId;
    return {
      employeeId,
      rate: employee.rate,
      role: employee.role
    };
  });
};

function ProjectForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const project = useSelector((state) => state.projects.project);
  const loading = useSelector((state) => state.projects.isLoading);
  const error = useSelector((state) => state.projects.error);

  const [redirect, setRedirect] = useState(false);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [title, setTitle] = useState('Add Project');
  const [requestType, setRequestType] = useState('POST');
  const [employeeIdValue, setEmployeeIdValue] = useState('');

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [buttonText, setButtonText] = useState('Add Project');
  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  const schema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().min(10).max(100),
    status: Joi.string(),
    employees: Joi.array().items(
      Joi.object({
        rate: Joi.number().required().greater(0),
        role: Joi.string().required(),
        employeeId: Joi.string().required()
      })
    ),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').optional()
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      employees: []
    }
  });

  console.log(errors, 'errors');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    if (redirect) {
      routeChange();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!employees || employees.length <= 0) {
      dispatch(getEmployees());
    }
    const newEmployees = employees.map((employee) => {
      return {
        label: `${employee.firstName} ${employee.lastName}`,
        value: employee.employeeId?._id
      };
    });
    setEmployeeOptions(newEmployees);
    if (error) {
      openModal();
    }
  }, [employees]);

  useEffect(() => {
    if (project._id) {
      setValue('name', project.name);
      setValue('status', project.status);
      setValue('description', project.description);
      setValue('startDate', project.startDate.slice(0, 10));
      setValue('endDate', project.endDate.slice(0, 10));
      setValue('employees', mapEmployees(project.employees));
      setRequestType('PUT');
      setButtonText('Update Employee');
      setTitle('Update Project');
    }
  }, [error]);
  const onSubmit = (data) => {
    console.log(data, 'data');
    const body = {
      name: data.name,
      status: data.status,
      description: data.description,
      employees: data.employees,
      startDate: data.startDate,
      endDate: data.endDate
    };
    setRedirect(true);
    if (requestType === 'PUT') {
      dispatch(putProject(project._id, body));
      setModalTitle('Project updated');
      setMsg('Project updated successfully!');
      openModal();
    } else {
      dispatch(postProject(body));
      setModalTitle('Project created');
      setMsg('Project created successfully!');
      openModal();
    }
  };

  const routeChange = () => {
    let path = `/projects`;
    history.push(path);
  };

  const ls = LoadingScreen();
  if (loading) {
    return ls;
  } else {
    return (
      <div className={styles.container}>
        <Modal modalTitle={modalTitle} isOpen={isOpen} handleClose={() => closeModal()}>
          <p>{msg}</p>
          <div>
            <Button
              text="OK"
              handler={() => {
                closeModal();
              }}
            />
          </div>
        </Modal>
        <h2 className={styles.h2}>{title}</h2>
        <form className={styles.form}>
          <div className={styles.projects}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  className={styles.label}
                  name="Name"
                  value={value}
                  placeholder="Name"
                  onChange={onChange}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`status`}
              render={({ field: { value, onChange } }) => (
                <Select
                  name={'Status'}
                  className={styles.label}
                  value={value}
                  onChange={onChange}
                  options={[
                    { label: `Active`, value: 'active' },
                    { label: `Inactive`, value: 'inactive' }
                  ]}
                  error={errors.employees?.employeeI}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <Input
                  className={styles.label}
                  name="Description"
                  type="text"
                  value={value}
                  placeholder="Description"
                  onChange={onChange}
                  error={errors.description?.message}
                />
              )}
            />
          </div>
          <div className={styles.dates}>
            <div className={styles.date}>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { value, onChange } }) => (
                  <Input
                    className={styles.label}
                    name="Start Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                  />
                )}
                error={errors.startDate?.message}
              />
            </div>
            <div className={styles.date}>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { value, onChange } }) => (
                  <Input
                    className={styles.label}
                    name="End Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                    error={errors.endDate?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.addEmployeeDiv}>
            <ul className={styles.employeeUl}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.employeeDiv}>
                  <Controller
                    control={control}
                    name={`employees[${index}].employeeId`}
                    defaultValue={field.text}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Select
                        className={styles.employeeMargin}
                        name={'Employee'}
                        value={value}
                        onChange={onChange}
                        options={employeeOptions}
                        error={error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`employees[${index}].rate`}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Input
                        className={styles.employeeMargin}
                        name="Rate"
                        type="number"
                        value={value}
                        placeholder="Rate"
                        onChange={onChange}
                        error={error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`employees[${index}].role`}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <Select
                        name={'Role'}
                        className={styles.label}
                        value={value}
                        onChange={onChange}
                        options={[
                          { label: `PM`, value: 'PM' },
                          { label: `DEV`, value: 'DEV' },
                          { label: `QA`, value: 'QA' },
                          { label: `TL`, value: 'TL' }
                        ]}
                        error={error?.message}
                      />
                    )}
                  />
                  <Button type={'delete'} text={'Delete'} handler={() => remove(index)} />
                </div>
              ))}
            </ul>
            <Button
              text={'Add new employee to Project'}
              type="button"
              handler={(e) => {
                e.preventDefault();
                append({ employeeId: '', rate: 0, role: '' });
              }}
            />
          </div>
          <div>
            <Button
              text="Return"
              handler={() => {
                dispatch(clearError());
                routeChange();
              }}
            />
            <Button text={buttonText} handler={handleSubmit(onSubmit)} />
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
