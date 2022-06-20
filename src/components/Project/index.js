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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required().min(3),
  status: Joi.string(),
  description: Joi.string().min(10).max(100),
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

function EmployeeItem({ employee }) {
  return (
    <tr>
      <td>{employee.employeeId}</td>
      <td>{employee.role}</td>
      <td>{employee.rate}</td>
    </tr>
  );
}

function ProjectForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const project = useSelector((state) => state.projects.project);
  const loading = useSelector((state) => state.projects.isLoading);
  const error = useSelector((state) => state.projects.error);

  const [redirect, setRedirect] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [employeeIdValue, setEmployeeIdValue] = useState('');
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [title, setTitle] = useState('Add Project');
  const [rateValue, setRateValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [employeesValue, setEmployeesValue] = useState([]);
  const [requestType, setRequestType] = useState('POST');

  const [msg, setMsg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add Project');
  const [buttonText, setButtonText] = useState('Add Project');

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: '',
      status: '',
      description: '',
      startDate: '',
      endDate: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employee'
  });

  const onChangeEmployeeIdInput = (event) => {
    setEmployeeIdValue(event.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    if (redirect) {
      routeChange();
    }
    setIsOpen(false);
  };

  const onAddEmployee = (event) => {
    event.preventDefault();
    if (employeeIdValue != '' && rateValue != '' && rateValue >= 0 && roleValue != '') {
      setEmployeesValue([
        ...employeesValue,
        { employeeId: employeeIdValue, rate: rateValue, role: roleValue }
      ]);
    } else {
      setModalTitle('Error');
      setMsg('Role and rate are required and rate must be bigger than 0');
      openModal();
    }
  };

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

  useEffect(() => {
    if (project._id) {
      let startDate = project.startDate.slice(0, 10);
      let endDate = project.endDate ? project.endDate.slice(0, 10) : '';
      setNameValue(project.name);
      setStatusValue(project.status);
      setDescriptionValue(project.description);
      setStartDateValue(startDate);
      setEndDateValue(endDate);
      setRequestType('PUT');
      setTitle('Edit Project');
      setButtonText('Update Project');
      const projectEmployees = mapEmployees(project.employees);
      setEmployeesValue(projectEmployees);
    }
  }, [error]);
  console.log(watch('employee'));
  const onSubmit = async (event) => {
    console.log(event);
    // event.preventDefault();
    // const dateNow = new Date().toISOString().slice(0, 10);
    // if (
    //   nameValue != '' &&
    //   statusValue != '' &&
    //   descriptionValue != '' &&
    //   employeesValue.length >= 0 &&
    //   startDateValue != '' &&
    //   startDateValue <= dateNow &&
    //   (endDateValue == '' || endDateValue >= dateNow)
    // ) {
    //   const body = {
    //     name: nameValue,
    //     status: statusValue,
    //     description: descriptionValue,
    //     employees: employeesValue,
    //     startDate: startDateValue,
    //     endDate: endDateValue
    //   };
    //   setRedirect(true);
    //   if (requestType === 'PUT') {
    //     dispatch(putProject(project._id, body));
    //     setModalTitle('Project updated');
    //     setMsg('Project updated successfully!');
    //     openModal();
    //   } else {
    //     dispatch(postProject(body));
    //     setModalTitle('Project created');
    //     setMsg('Project created successfully!');
    //     openModal();
    //   }
    // } else {
    //   setModalTitle('Error');
    //   setMsg('All fields are required');
    //   openModal();
    // }
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
                />
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange } }) => (
                <Input
                  className={styles.label}
                  name="Status"
                  type="text"
                  value={value}
                  placeholder="Status: active or inactive"
                  onChange={onChange}
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
                    name={`employee[${index}].employeeId`}
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
                    name={`employee[${index}].rate`}
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
                    name={`employee[${index}].role`}
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
