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

const TableRow = ({ project, projectId }) => {
  const employeeNameMap = project
    .filter((project) => project.projectId === projectId)
    .map((project) => project.projectId.firstName + ' ' + project.projectId.lastName);
  return (
    <tr className={styles.containerTable}>
      <td>{employeeNameMap}</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  );
};

const PmTimeSheet = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [projectId, setProjectId] = useState('');
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
    setEndDate(startDate + 6 * 60 * 60 * 24 * 1000);
  }, [startDate]);

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects(`employees.employeeId=${idEmployee}`));
    }
    setProjectsOptions([
      ...projects.map((project) => ({ value: project?._id, label: project?.name }))
    ]);

    if (error) {
      openModal();
    }
    if (date.getUTCDay() !== 1) {
      setStartDate(date.setDate(date.getDate() - date.getDay() + 1));
    } else {
      setStartDate(Date.now());
    }

    if (!timeSheets.length) {
      dispatch(getTimeSheets());
    }
    const tsEmployee = timeSheets.filter((ts) => {
      if (ts.employeeI?._id === idEmployee) {
        return ts;
      }
    });

    let projectsIdsEmployeeUnfiltered = [];
    for (let i = 1; i < tsEmployee.length; i++) {
      for (let j = 0; j < tsEmployee[i].tasks.length; j++) {
        projectsIdsEmployeeUnfiltered.push(tsEmployee[i].tasks[j].projectId);
      }
    }
    const projectsIdsEmployee = projectsIdsEmployeeUnfiltered.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  }, [timeSheets, projects]);

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
        onChange={setProjectId}
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
      </table>
      <div className={styles.buttonContainer}>
        <Button text="Add new progress" handler={openModal} />
      </div>
    </div>
  );
};

export default PmTimeSheet;
