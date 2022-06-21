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

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [buttonText, setButtonText] = useState('Add Project');

  const schema = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().min(10).max(100),
    employees: Joi.array().items(
      Joi.object({
        rate: Joi.number().required().greater(0),
        role: Joi.string().required().valid('QA', 'DEV', 'PM'),
        _id: Joi.string().required()
      })
    ),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').optional()
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      name: '',
      status: 'active',
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
        value: employee._id
      };
    });
    setEmployeeOptions(newEmployees);
    if (error) {
      openModal();
    }
  }, [employees]);

  console.log(project);

  useEffect(() => {
    if (project._id) {
      setValue('name', project.name);
      setValue('status', project.status);
      setValue('description', project.description);
      setValue('startDate', project.startDate.slice(0, 10));
      setValue('endDate', project.endDate.slice(0, 10));
      project.employees.map((employee) => {
        setValue('employeeId', employee._id);
      });
      console.log(project.employees);
      setValue('employees', project.employees);
      setRequestType('PUT');
    }
  }, [error]);
  const onSubmit = (data) => {
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            <div>
              <label htmlFor="">Project Status</label>
              <input {...register('status')} type={'radio'} value={'active'} name={'status'} />
              Active
              <input {...register('status')} type="radio" value="inactive" name="status" />
              Inactive
            </div>
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
          <div className={styles.inputsContainer}>
            <ul>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    control={control}
                    name={`employees[${index}].employeeId`}
                    defaultValue={field.text}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        name={'Employee'}
                        className={styles.label}
                        value={value}
                        onChange={onChange}
                        options={employeeOptions}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`employees[${index}].rate`}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        className={styles.label}
                        name="Rate"
                        type="number"
                        value={value}
                        placeholder="Rate"
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`employees[${index}].role`}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        className={styles.label}
                        name="Role"
                        type="text"
                        value={value}
                        placeholder="Role"
                        onChange={onChange}
                      />
                    )}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </ul>
            <button type="button" onClick={() => append({ employeeId: '', rate: 0, role: '' })}>
              append
            </button>
          </div>
          <div>
            <Button
              text="Return"
              handler={() => {
                dispatch(clearError());
                routeChange();
              }}
            />
            <Button text={buttonText} />
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
