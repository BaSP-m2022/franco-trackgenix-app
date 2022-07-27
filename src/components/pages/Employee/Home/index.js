import { formatDate } from 'utils/formatters';
import Button from 'components/Shared/Button';
import Modal from 'components/Shared/Modal';
import Input from 'components/Shared/Input';
import SelectDropdown from 'components/Shared/SelectDropdown';
import { LoadingScreen } from 'components/Shared';
import styles from './home.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getTimeSheets, putTimeSheet } from 'redux/timeSheets/thunks';
import { clearError } from 'redux/timeSheets/actions';
import { getProjects } from 'redux/projects/thunks';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const TableRow = ({ project, timeSheet }) => {
  let projectName = project.name;
  let hoursDay = [0, 0, 0, 0, 0, 0, 0];
  let total = 0;
  timeSheet?.tasks.map((task) => {
    if (project._id == task.projectId) {
      projectName = project.name;
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
    }
  });
  for (let i = 0; i < 7; i++) {
    total = total + hoursDay[i];
  }
  return (
    <tr className={styles.containerTable}>
      <td>{projectName}</td>
      <td>{hoursDay[0] != 0 ? <b>{hoursDay[0]}</b> : '/'}</td>
      <td>{hoursDay[1] != 0 ? <b>{hoursDay[1]}</b> : '/'}</td>
      <td>{hoursDay[2] != 0 ? <b>{hoursDay[2]}</b> : '/'}</td>
      <td>{hoursDay[3] != 0 ? <b>{hoursDay[3]}</b> : '/'}</td>
      <td>{hoursDay[4] != 0 ? <b>{hoursDay[4]}</b> : '/'}</td>
      <td>{hoursDay[5] != 0 ? <b>{hoursDay[5]}</b> : '/'}</td>
      <td>{hoursDay[6] != 0 ? <b>{hoursDay[6]}</b> : '/'}</td>
      <td>{total != 0 ? <b>{total}</b> : '/'}</td>
    </tr>
  );
};

const schema = Joi.object({
  tasks: Joi.array().items(
    Joi.object({
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
    })
  )
});

const dateOptions = (startDate) => {
  const multiplyDate = (m) => new Date(startDate).setDate(new Date(startDate).getDate() + 1 + m);
  return [
    {
      value: formatDate(multiplyDate(0)),
      label: formatDate(multiplyDate(0))
    },
    {
      value: formatDate(multiplyDate(1)),
      label: formatDate(multiplyDate(1))
    },
    {
      value: formatDate(multiplyDate(2)),
      label: formatDate(multiplyDate(2))
    },
    {
      value: formatDate(multiplyDate(3)),
      label: formatDate(multiplyDate(3))
    },
    {
      value: formatDate(multiplyDate(4)),
      label: formatDate(multiplyDate(4))
    },
    {
      value: formatDate(multiplyDate(5)),
      label: formatDate(multiplyDate(5))
    },
    {
      value: formatDate(multiplyDate(6)),
      label: formatDate(multiplyDate(6))
    }
  ];
};

const EmployeeHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [timeSheetsEmployee, setTimeSheetEmployee] = useState({});
  const [order, setOrder] = useState(0);
  const [projectsEmployee, setProjectsEmployee] = useState([]);
  const [click, setClick] = useState(0);
  const [idEmployee, setIdEmployee] = useState(
    JSON.parse(sessionStorage.getItem('loggedUser'))?._id
  );

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tasks: {
        date: '',
        projectId: '',
        description: '',
        workedHours: ''
      }
    },
    resolver: joiResolver(schema)
  });

  const timeSheets = useSelector((state) => state.timeSheets.list);
  const loadingTimeSheets = useSelector((state) => state.timeSheets.loading);
  const loadingProjects = useSelector((state) => state.projects.loading);
  const projects = useSelector((state) => state.projects.list);
  const errorTimeSheets = useSelector((state) => state.timeSheets.error);
  const errorProjects = useSelector((state) => state.projects.error);

  useEffect(() => {
    setIdEmployee(JSON.parse(sessionStorage.getItem('loggedUser'))?._id);
  }, [timeSheets, idEmployee]);

  useEffect(() => {
    console.log('timeSheets', timeSheets);
    if (!timeSheets.length) {
      dispatch(getTimeSheets(`employeeId=${idEmployee}`));
    }
    setTimeSheetEmployee(
      timeSheets.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      })
    );
    setOrder(timeSheetsEmployee.length - 1);
    if (!projects.length) {
      dispatch(getProjects(`employees.employeeId=${idEmployee}`));
    }
    setProjectsEmployee(projects);
    setProjectsOptions([
      ...projectsEmployee?.map((project) => ({ value: project?._id, label: project?.name }))
    ]);
    console.log(timeSheetsEmployee);
  }, [timeSheets, timeSheetsEmployee]);

  useEffect(() => {
    setValue('tasks', formatTasks());
  }, [timeSheetsEmployee[order]]);

  const formatTasks = () => {
    timeSheetsEmployee[order]?.tasks.map((task) => {
      task.projectId = typeof task.projectId == 'object' ? task.projectId?._id : task.projectId;
      task.date = task.date.slice(0, 10);
      delete task._id;
    });
    return timeSheetsEmployee[order]?.tasks;
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks'
  });

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

  const previousTimeSheet = () => {
    if (order > 0) {
      setOrder(order - 1);
    }
  };
  const nextTimeSheet = () => {
    if (order < timeSheetsEmployee.length - 1) {
      setOrder(order + 1);
    }
  };

  const onSubmit = (data) => {
    const body = JSON.stringify({
      startDate: timeSheetsEmployee[order].startDate,
      tasks: data.tasks,
      employeeId: timeSheetsEmployee[order].employeeId._id
    });
    dispatch(putTimeSheet(timeSheetsEmployee[order]._id, body));
    setModalTitle('Task Added');
    setModalText('Task has been added');
    openOtherModal();
  };

  const history = useHistory();

  const routeChange = () => {
    dispatch(getTimeSheets(`employeeId=${idEmployee}`));
    history.push('/employee/home');
  };
  if (idEmployee === undefined) {
    return (
      <div className={styles.container}>
        <b>You don&apos;t have access to this page.</b>
      </div>
    );
  } else {
    if (loadingTimeSheets || loadingProjects) {
      return <LoadingScreen />;
    } else {
      return (
        <div className={styles.container}>
          <Modal modalTitle="Add new progress" isOpen={isOpen} handleClose={closeModal}>
            <div className={styles.modal}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={styles.h3}>Tasks</h3>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <Controller
                          control={control}
                          name={`tasks[${index}].date`}
                          render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <SelectDropdown
                              options={dateOptions(timeSheetsEmployee[order].startDate)}
                              name="Date"
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
                      <div className={(styles.buttonContainer, styles.col, styles.buttonDelete)}>
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
                <div className={styles.buttonContainer}>
                  <Button
                    text={'Add new task'}
                    type="button"
                    handler={(e) => {
                      e.preventDefault();
                      setClick(click + 1);
                      append({
                        date: '',
                        projectId: '',
                        description: '',
                        workedHours: 0
                      });
                    }}
                  />
                </div>
                {click === 0 && errors ? <p>{errors?.message}</p> : null}
                {click != 0 && errors && !errors.type != 'array.min' ? (
                  <p>{errors?.message}</p>
                ) : null}
                <Button text="Save" handler={handleSubmit(onSubmit)} />
                <Button text="Cancel" handler={closeModal} />
              </form>
            </div>
          </Modal>
          <Modal
            modalTitle={
              errorTimeSheets || errorProjects ? errorTimeSheets + '. ' + errorProjects : modalTitle
            }
            isOpen={isOtherOpen}
            handleClose={closeOtherModal}
          >
            {errorTimeSheets || errorProjects ? errorTimeSheets + '. ' + errorProjects : modalText}
            <div className={styles.buttonContainer}>
              <Button
                text="OK"
                handler={() => {
                  closeModal();
                  closeOtherModal();
                  clearError();
                  routeChange();
                }}
              />
            </div>
          </Modal>
          <h2 className={styles.h2}>Employee &gt; Home</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th colSpan={9} className={styles.date}>
                  <Button text="<" handler={previousTimeSheet} />
                  {timeSheetsEmployee.length === 0 ? (
                    ' - '
                  ) : (
                    <span>
                      {formatDate(
                        new Date(timeSheetsEmployee[order]?.startDate).setDate(
                          new Date(timeSheetsEmployee[order]?.startDate).getDate() + 1
                        )
                      )}{' '}
                      -{' '}
                      {formatDate(
                        new Date(timeSheetsEmployee[order]?.startDate).setDate(
                          new Date(timeSheetsEmployee[order]?.startDate).getDate() + 7
                        )
                      )}
                    </span>
                  )}
                  <Button text=">" handler={nextTimeSheet} />
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
              {timeSheetsEmployee.length || projectsEmployee.length ? (
                projectsEmployee.map((project, key) => (
                  <TableRow key={key} project={project} timeSheet={timeSheetsEmployee[order]} />
                ))
              ) : (
                <tr className={styles.containerTable}>
                  <td colSpan={9}>No TimeSheets found</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.buttonContainer}>
            {timeSheetsEmployee.length ? (
              <Button text="Add new progress" handler={openModal} />
            ) : (
              ''
            )}
          </div>
        </div>
      );
    }
  }
};

export default EmployeeHome;
