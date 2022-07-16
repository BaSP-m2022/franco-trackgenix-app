/* eslint-disable no-unused-vars */
import { formatDate } from 'utils/formatters';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import Input from 'components/Shared/Input';
import SelectDropdown from 'components/Shared/SelectDropdown';
import styles from './home.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getTimeSheets } from 'redux/timeSheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const TableRow = ({ project, timeSheet }) => {
  let projectName;
  let hoursDay = [0, 0, 0, 0, 0, 0, 0];
  let total = 0;
  console.log(timeSheet, 'ts');
  timeSheet.map((ts) => {
    return ts.tasks.map((task) => {
      if (project._id == task.projectId._id) {
        projectName = task.projectId.name;
        const taskDate = new Date(task.date);
        if (taskDate.getUTCDay() == 1) {
          hoursDay[0] = hoursDay[0] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 2) {
          hoursDay[1] = hoursDay[1] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 3) {
          hoursDay[2] = hoursDay[2] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 4) {
          hoursDay[3] = hoursDay[3] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 5) {
          hoursDay[4] = hoursDay[4] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 6) {
          hoursDay[5] = hoursDay[5] + task.workedHours;
        }
        if (taskDate.getUTCDay() == 0) {
          hoursDay[6] = hoursDay[6] + task.workedHours;
        }
        for (let i = 0; i < hoursDay.length; i++) {
          total = hoursDay[i];
        }
      }
    });
  });
  return (
    <tr className={styles.containerTable}>
      <td>{projectName}</td>
      <td>{hoursDay[0]}</td>
      <td>{hoursDay[1]}</td>
      <td>{hoursDay[2]}</td>
      <td>{hoursDay[3]}</td>
      <td>{hoursDay[4]}</td>
      <td>{hoursDay[5]}</td>
      <td>{hoursDay[6]}</td>
      <td>{total}</td>
    </tr>
  );
};

const EmployeeHome = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [requestType] = useState('POST');
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [timeSheetEmployee, setTimeSheetEmployee] = useState({});
  const [tasksEmployee, setTasksEmployee] = useState([]);
  const [projectsEmployee, setProjectsEmployee] = useState([]);
  const [click, setClick] = useState(0);

  const dispatch = useDispatch();

  const schema = Joi.object({
    description: Joi.string().min(3).max(50).required().messages({
      'string.empty': 'You must add a description',
      'string.min': 'The description must have more than 3 characters.',
      'string.max': 'The description should not be longer than 50 characters.'
    }),
    workedHours: Joi.number().min(1).required().messages({
      'string.empty': 'You must add the worked hours',
      'number.min': 'Worked hours must be more than 1 hr.'
    }),
    projectId: Joi.string().required().messages({ 'string.empty': 'You must select a project' }),
    date: Joi.date().required().messages({ 'string.empty': 'You must select a date' })
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      date: '',
      projectId: '',
      description: '',
      workedHours: ''
    },
    resolver: joiResolver(schema)
  });

  const timeSheets = useSelector((state) => state.timeSheets.list);
  const projects = useSelector((state) => state.projects.list);
  const error = useSelector((state) => state.timeSheets.error);
  const idEmployee = '62ceb394684df6d95638071b';

  useEffect(() => {
    if (!timeSheets.length) {
      dispatch(
        getTimeSheets({
          employeeId: { _id: '62ceb30b684df6d956380716' }
        })
      );
    }
    if (!projects.length) {
      dispatch(
        getProjects({
          employees: { employeeId: { _id: '62ceb30b684df6d956380716' } }
        })
      );
    }
    const projectsOfEmployee = projects.filter((project) => {
      return project.employees.find((emp) => emp.employeeId._id === idEmployee);
    });
    setProjectsEmployee(projectsOfEmployee);
    setProjectsOptions([
      ...projectsEmployee.map((project) => ({ value: project?._id, label: project?.name }))
    ]);
    if (date.getDay() > 0) {
      setStartDate(date.setDate(date.getDate() - date.getDay()));
    } else {
      setStartDate(Date.now());
    }
    setEndDate(date.setDate(date.getDate() + 6));
    setTimeSheetEmployee(timeSheets);
  }, [timeSheets, projects]);

  const openModal = () => {
    setIsOpen(true);
  };

  const openOtherModal = () => {
    setIsOtherOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeOtherModal = () => {
    setIsOtherOpen(false);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks'
  });

  const onSubmit = async () => {
    /*    const body = JSON.stringify({
      description: data.description,
      date: data.date,
      workedHours: data.workedHours,
      projectId: data.projectId
    });*/

    if (requestType === 'POST') {
      //      dispatch(postTask(body));
      setModalTitle('Task Added');
      setModalText('Task has been added');
    }
    openOtherModal();
  };
  const history = useHistory();
  const routeChange = () => {
    // dispatch(getTasks());
    history.push('/employee/home');
  };
  return (
    <div className={styles.container}>
      <Modal modalTitle="Add new progress" isOpen={isOpen} handleClose={closeModal}>
        <div className={styles.modal}>
          <form>
            <div className={styles.date}>
              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Input
                    className={styles.label}
                    name="Date"
                    type="date"
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <h3 className={styles.h3}>Tasks</h3>
            <div className={styles.tasksDiv}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.task}>
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <Controller
                        control={control}
                        name={`tasks[${index}].projectId`}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <SelectDropdown
                            name="Project"
                            value={value}
                            onChange={onChange}
                            options={projectsOptions}
                            required={false}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className={styles.col}>
                      <Controller
                        control={control}
                        name={`tasks[${index}].description`}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <Input
                            className={styles.label}
                            name="Description"
                            type="text"
                            value={value}
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className={styles.col}>
                      <Controller
                        control={control}
                        name={`tasks[${index}].workedHours`}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                          <Input
                            className={styles.label}
                            name="Worked Hours"
                            type="number"
                            value={value}
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className={(styles.col, styles.buttonDelete)}>
                      <Button
                        type={'delete'}
                        text={'X'}
                        handler={() => {
                          remove(index);
                          setClick(click - 1);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                text={'Add new task'}
                type="button"
                handler={(e) => {
                  e.preventDefault();
                  setClick(click + 1);
                  append({ projectId: '', description: '', workedHours: 0 });
                }}
              />
            </div>
            {click === 0 && errors ? <p>{errors?.message}</p> : null}
            {click != 0 && errors && !errors.type != 'array.min' ? <p>{errors?.message}</p> : null}
            <Button text="Cancel" handler={closeModal} />
            <Button
              text="Save"
              handler={() => {
                handleSubmit(onSubmit);
                if (!error) {
                  routeChange();
                }
              }}
            />
          </form>
        </div>
      </Modal>
      <Modal modalTitle={modalTitle} isOpen={isOtherOpen} handleClose={closeOtherModal}>
        {modalText}
        <Button text="OK" handler={closeOtherModal} />
      </Modal>
      <h2 className={styles.h2}>Employee &gt; Home</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={9} className={styles.date}>
              <Button text="<" />
              {formatDate(startDate)} - {formatDate(endDate)}
              <Button text=">" />
            </th>
          </tr>
          <tr>
            <th>Project</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Total hs</th>
          </tr>
        </thead>
        <tbody>
          {projectsEmployee.map((project, key) => (
            <TableRow key={key} project={project} timeSheet={timeSheetEmployee} />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Button text="Add new progress" handler={openModal} />
      </div>
    </div>
  );
};

export default EmployeeHome;
