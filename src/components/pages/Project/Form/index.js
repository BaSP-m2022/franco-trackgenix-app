import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { clearError } from 'redux/projects/actions';
import { postProject, putProject } from 'redux/projects/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { capitalizeFirstLetter } from 'utils/formatters';
import { Input, Button, Modal, LoadingScreen, SelectDropdown } from 'components/Shared';
import styles from './form.module.css';

const mapEmployees = (employees) => {
  return employees.map((employee) => {
    const employeeId =
      typeof employee.employeeId == 'object' ? employee.employeeId?._id : employee.employeeId;
    return {
      employeeId,
      rate: employee.rate,
      role: employee.role
    };
  });
};
const schema = Joi.object({
  name: Joi.string().required().min(3).messages({ 'string.empty': 'You must add a Name.' }),
  description: Joi.string().min(10).max(100).messages({
    'string.empty': 'You must add a Description.',
    'string.min': 'The description should be larger than 10 characters',
    'string.max': 'The description should be shorter than 100 characters'
  }),
  status: Joi.string().required().messages({ 'string.empty': 'You must select a project Status.' }),
  employees: Joi.array()
    .min(1)
    .messages({
      'array.min': 'There must be at least an employee added to the project.'
    })
    .custom((value, helper) => {
      let hasPM = 0;
      value.map((employee) => {
        employee.role === 'PM' && hasPM++;
      });
      if (hasPM > 1) return helper.message('Project must have only one Project Manager');
      if (hasPM === 0) return helper.message('Project must have a Project Manager');
      return value;
    })
    .items(
      Joi.object({
        rate: Joi.number().required().min(1).messages({
          'number.min': 'The rate must be bigger than zero.'
        }),
        role: Joi.string().required().messages({ 'string.empty': 'You must select a Role.' }),
        employeeId: Joi.string()
          .required()
          .messages({ 'string.empty': 'You must select an Employee.' })
      })
    ),
  startDate: Joi.date().required().messages({
    'date.base': 'You must add a Start Date.'
  }),
  endDate: Joi.date()
    .min(Joi.ref('startDate'))
    .allow('')
    .message('The End Date of the project must be greater than the Start Date')
});

function ProjectForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const project = useSelector((state) => state.projects.project);
  const loading = useSelector((state) => state.projects.loading);
  const errorDB = useSelector((state) => state.projects.error);

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [title, setTitle] = useState('Add Project');
  const [requestType, setRequestType] = useState('POST');

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [buttonText, setButtonText] = useState('Add Project');
  const [click, setClick] = useState(0);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      name: '',
      status: '',
      description: '',
      startDate: '',
      endDate: '',
      employees: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
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
    if (errorDB) {
      openModal();
    }
  }, [employees]);

  useEffect(() => {
    if (project._id) {
      setValue('name', project.name);
      setValue('status', project.status);
      setValue('description', project.description);
      setValue('startDate', project.startDate.slice(0, 10));
      setValue('endDate', project.endDate?.slice(0, 10));
      setValue('employees', mapEmployees(project.employees));
      setRequestType('PUT');
      setButtonText('Update Project');
      setTitle('Update Project');
    }
  }, [project]);

  const onSubmit = (data) => {
    const body = {
      name: capitalizeFirstLetter(data.name),
      status: data.status,
      description: capitalizeFirstLetter(data.description),
      employees: data.employees,
      startDate: data.startDate,
      endDate: data.endDate
    };
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

  const handleClose = () => {
    closeModal();
    dispatch(clearError());
  };

  const ls = LoadingScreen();
  if (loading) {
    return ls;
  } else {
    return (
      <div className={styles.container}>
        <Modal modalTitle={errorDB ? 'ERROR' : modalTitle} isOpen={isOpen}>
          <p>{errorDB ? errorDB : msg}</p>
          <div>
            <Button text="OK" handler={!errorDB ? routeChange : handleClose} />
          </div>
        </Modal>
        <h2 className={styles.h2}>{title}</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.projects}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  className={styles.label}
                  name="Name"
                  value={value}
                  placeholder="Name"
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name={`status`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <SelectDropdown
                  className={styles.label}
                  name="Status"
                  value={value}
                  onChange={onChange}
                  options={[
                    { label: `To do`, value: 'To do' },
                    { label: `In progress`, value: 'In progress' },
                    { label: `Done`, value: 'Done' }
                  ]}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  className={styles.label}
                  name="Description"
                  type="text"
                  value={value}
                  placeholder="Description"
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </div>
          <div className={styles.dates}>
            <div className={styles.date}>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Input
                    className={styles.label}
                    name="Start Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <div className={styles.date}>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Input
                    className={styles.label}
                    name="End Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.addEmployeeDiv}>
            <div className={styles.employeeList}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.employeeDiv}>
                  <Controller
                    control={control}
                    name={`employees[${index}].employeeId`}
                    defaultValue={field.text}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <SelectDropdown
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
                        min={0}
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
                      <SelectDropdown
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
                  <Button
                    type={'delete'}
                    text={'Delete'}
                    handler={(e) => {
                      e.preventDefault();
                      remove(index);
                      setClick(click - 1);
                    }}
                  />
                </div>
              ))}
            </div>
            <Button
              text={'Add new employee to Project'}
              type="button"
              handler={(e) => {
                e.preventDefault();
                setClick(click + 1);
                append({ employeeId: '', rate: 0, role: '' });
              }}
            />
          </div>
          {click === 0 && errors.employees ? (
            <p className={styles.errorArray}>{errors.employees?.message}</p>
          ) : null}
          {click != 0 && errors.employees && !errors.employees.type != 'array.min' ? (
            <p className={styles.errorArray}>{errors.employees?.message}</p>
          ) : null}
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
