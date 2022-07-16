/* eslint-disable no-unused-vars */
import styles from './timesheet.module.css';
import { formatDate } from 'utils/formatters';
import { Button, SelectDropdown, Modal, Input } from 'components/Shared';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getTimeSheets } from 'redux/timeSheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FilterEmployee = (employees) => {
  if (employees?.length > 0) {
    const ids = employees.map((employee) => employee.employeeId._id);
    const filtered = employees.filter(
      (employee, index) => !ids.includes(employee.employeeId._id, index + 1)
    );
    return filtered;
  } else return [];
};

const TableRow = ({ employee, timesheets, projectId, date }) => {
  const hourDays = [0, 0, 0, 0, 0, 0, 0, 0];
  timesheets.map((timesheet) => {
    if (timesheet.employeeId._id === employee.employeeId._id || timesheet.startDate === date) {
      timesheet.tasks.map((task) => {
        if (task.projectId._id === projectId) {
          const date = new Date(task.date);
          if (date.getUTCDay() < 1) hourDays[date.getUTCDay() - 1] += task.workedHours;
          else hourDays[date.getUTCDay() - 1] += task.workedHours;
          hourDays[7] += task.workedHours;
        }
      });
    }
  });
  return (
    <tr>
      <td>{employee.employeeId.firstName + ' ' + employee.employeeId.lastName}</td>
      <td>{hourDays[0]}</td>
      <td>{hourDays[1]}</td>
      <td>{hourDays[2]}</td>
      <td>{hourDays[3]}</td>
      <td>{hourDays[4]}</td>
      <td>{hourDays[5]}</td>
      <td>{hourDays[6]}</td>
      <td>{hourDays[7]}</td>
    </tr>
  );
};

const PmTimeSheet = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [filteredTimesheet, setFilteredTimesheet] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [click, setClick] = useState(0);
  const [selectedProject, setSelectedProject] = useState();
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
  const idEmployee = '62ceb357684df6d956380719';

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects(`employees.employeeId=${idEmployee}`));
    }

    setProjectsOptions([
      ...projects.map((project) => ({ value: project?._id, label: project?.name }))
    ]);

    // if (error) {
    //   openModal();
    // }
    if (date.getUTCDay() !== 1) {
      setStartDate(date.setDate(date.getDate() - date.getDay() + 1));
    } else {
      setStartDate(Date.now());
    }
  }, [timeSheets, projects]);

  useEffect(() => {
    setEndDate(startDate + 6 * 60 * 60 * 24 * 1000);
    if (!timeSheets.length) {
      dispatch(getTimeSheets());
    }
    setFilteredTimesheet(
      timeSheets.filter((timesheet) => {
        const date = new Date(startDate);
        date.setUTCHours(0, 0, 0, 0);
        if (timesheet.startDate === date.toISOString()) {
          return timesheet;
        }
      })
    );
  }, [startDate]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks'
  });

  const history = useHistory();
  const routeChange = () => {
    history.push('/employee/home');
  };

  const earlier = () => {
    setStartDate(startDate - 7 * 60 * 60 * 24 * 1000);
  };

  const later = () => {
    setStartDate(startDate + 7 * 60 * 60 * 24 * 1000);
  };

  return (
    <div className={styles.container}>
      <Modal modalTitle="Add new progress" isOpen={isOpen}>
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
                console.log('clicked');
                if (!error) {
                  routeChange();
                }
              }}
            />
          </form>
        </div>
      </Modal>
      <h2 className={styles.h2}>General Timesheet</h2>
      <SelectDropdown
        className={styles.label}
        name="Select Project"
        value={projectId}
        onChange={(e) => {
          setProjectId(e.currentTarget.value);
          setSelectedProject(projects.find((project) => project._id === e.currentTarget.value));
        }}
        options={projectsOptions}
        error={error?.message}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={9} className={styles.date}>
              <Button text="<" handler={earlier} />
              {formatDate(startDate)} - {formatDate(endDate)}
              <Button text=">" handler={later} />
            </th>
          </tr>
          <tr>
            <th>Employee</th>
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
          {FilterEmployee(selectedProject?.employees).map((employee, index) => (
            <TableRow
              employee={employee}
              timesheets={filteredTimesheet}
              key={index}
              projectId={selectedProject._id}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Button text="Add new progress" handler={openModal} />
      </div>
    </div>
  );
};

export default PmTimeSheet;
