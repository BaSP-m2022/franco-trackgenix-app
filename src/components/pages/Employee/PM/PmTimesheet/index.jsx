/* eslint-disable no-unused-vars */
import styles from './timesheet.module.css';
import { formatDate } from 'utils/formatters';
import { Button, SelectDropdown, Modal, Input, LoadingScreen } from 'components/Shared';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { getTimeSheets, postTimeSheet, putTimeSheet } from 'redux/timeSheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const filterEmployee = (project) => {
  if (project) {
    const ids = project.employees.map((employee) => employee.employeeId._id);
    return project.employees.filter(
      (employee, index) => !ids.includes(employee.employeeId._id, index + 1)
    );
  } else return [];
};

const schema = Joi.object({
  tasks: Joi.array().items(
    Joi.object({
      projectId: Joi.string(),
      date: Joi.date().required().messages({ 'string.empty': 'You must select a date' }),
      description: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'You must add a description',
        'string.min': 'The description must have more than 3 characters.',
        'string.max': 'The description should not be longer than 50 characters.'
      }),
      workedHours: Joi.number().min(1).required().messages({
        'string.empty': 'You must add the worked hours',
        'number.min': 'Worked hours must be more than 1 hr.'
      })
    })
  )
});

const formatTasks = (timeSheetList, employeeId, projectId) => {
  const tasksArray = timeSheetList.map((timesheet) => {
    if (timesheet.employeeId._id === employeeId) {
      return timesheet.tasks.map((task) => {
        if (task.projectId._id === projectId) {
          task.date = task.date.slice(0, 10);
          task.projectId = task.projectId._id;
          delete task._id;
          return task;
        }
      });
    }
    return [];
  });
  return tasksArray.find((task) => {
    if (task.length > 0) return task;
  });
};

const dateOptions = (startDate) => {
  const multiplyDate = (m) => new Date(startDate + 1000 * 60 * 60 * 24 * m);
  return [
    {
      value: formatDate(startDate),
      label: formatDate(startDate)
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

const PmTimeSheet = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOther, setIsOpenOther] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [employeeId, setEmployeeId] = useState();
  const [click, setClick] = useState(0);
  const [timeSheetList, setTimeSheetList] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalText, setModalText] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const dispatch = useDispatch();

  const TableRow = ({ employee, timesheets, projectId }) => {
    const hourDays = [0, 0, 0, 0, 0, 0, 0, 0];
    timesheets.map((timesheet) => {
      if (timesheet.employeeId._id === employee.employeeId._id) {
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
        <td>
          <Button
            text={'Modify Tasks'}
            handler={() => {
              setEmployeeId(employee.employeeId._id);
              openModal();
            }}
          />
        </td>
      </tr>
    );
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks'
  });

  const timeSheets = useSelector((state) => state.timeSheets.list);
  const projects = useSelector((state) => state.projects.list);
  const errorTimeSheets = useSelector((state) => state.timeSheets.error);
  const errorProjects = useSelector((state) => state.projects.error);
  const loading = useSelector((state) => state.timeSheets.loading);
  const loading2 = useSelector((state) => state.projects.loading);
  const idEmployee = '62ceb357684df6d956380719';

  useEffect(() => {
    if (date.getUTCDay() !== 0) {
      setStartDate(date.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1));
    } else {
      setStartDate(date.setUTCDate(date.getUTCDate() - 6));
    }

    if (!projects.length) dispatch(getProjects(`employees.employeeId=${idEmployee}`));

    setProjectsOptions([
      ...projects.map((project) => ({ value: project?._id, label: project?.name }))
    ]);

    if (errorProjects) {
      setModalTitle('Error in database of Projects');
      setModalText(errorProjects);
      openOtherModal();
    }
  }, [projects]);

  useEffect(() => {
    setEndDate(startDate + 6 * 60 * 60 * 24 * 1000);
    setTimeSheetList(
      timeSheets.filter((timesheet) => {
        const date = new Date(startDate);
        date.setUTCHours(0, 0, 0, 0);
        if (timesheet.startDate === date.toISOString()) {
          return timesheet;
        }
      })
    );
    if (errorTimeSheets) {
      setModalTitle('Error in database of Time sheets');
      setModalText(errorTimeSheets);
      openOtherModal();
    }
  }, [timeSheets, startDate]);

  useEffect(() => {
    if (projectId.length > 0) dispatch(getTimeSheets(`tasks.projectId=${projectId}`));
  }, [projectId]);

  useEffect(() => {
    if (employeeId) {
      setValue('tasks', formatTasks(timeSheetList, employeeId, projectId));
    }
  }, [employeeId]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openOtherModal = () => {
    setIsOpenOther(true);
  };

  const closeOtherModal = () => {
    setIsOpenOther(false);
  };

  const earlier = () => {
    setStartDate(startDate - 7 * 60 * 60 * 24 * 1000);
  };

  const latter = () => {
    setStartDate(startDate + 7 * 60 * 60 * 24 * 1000);
  };

  const onSubmit = (data) => {
    if (!timeSheetList.find((timesheet) => timesheet.employeeId._id === employeeId)) {
      const body = JSON.stringify({
        startDate: formatDate(startDate),
        tasks: data.tasks,
        employeeId: employeeId
      });
      dispatch(postTimeSheet(body));
    } else {
      const timesheet = timeSheetList.find((timesheet) => timesheet.employeeId._id === employeeId);
      const body = JSON.stringify({
        tasks: data.tasks,
        startDate: formatDate(startDate),
        employeeId: timesheet.employeeId._id
      });
      dispatch(putTimeSheet(timesheet._id, body));
    }
    if (errorTimeSheets) {
      closeModal();
      setModalTitle('Error in database of Time sheets');
      setModalText(errorTimeSheets);
      openOtherModal();
    } else {
      closeModal();
      setModalTitle('Time Sheet');
      setModalText('Time Sheet has been updated');
      openOtherModal();
    }
  };
  if (loading || loading2) {
    return <LoadingScreen />;
  } else {
    return (
      <div className={styles.container}>
        <Modal modalTitle={modalTitle} isOpen={isOpenOther}>
          <p className={styles.message}>{modalText}</p>
          <div>
            <Button
              text="OK"
              handler={() => {
                closeOtherModal();
                if (errorProjects || errorTimeSheets) openModal();
                else dispatch(getTimeSheets(`tasks.projectId=${projectId}`));
              }}
            />
          </div>
        </Modal>
        <Modal modalTitle="Add new progress" isOpen={isOpen}>
          <div className={styles.modal}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className={styles.h3}>Tasks</h3>
              <div className={styles.tasksDiv}>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.task}>
                    <Controller
                      control={control}
                      name={`tasks[${index}].date`}
                      render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <SelectDropdown
                          options={dateOptions(startDate)}
                          name="Date"
                          value={value}
                          onChange={onChange}
                          error={error?.message}
                        />
                      )}
                    />
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
                    <div>
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
                ))}
              </div>
              <Button
                text={'Add new task'}
                type="button"
                handler={(e) => {
                  e.preventDefault();
                  setClick(click + 1);
                  append({ projectId: projectId, date: '', description: '', workedHours: 0 });
                }}
              />
              {click === 0 && errors ? <p>{errors?.message}</p> : null}
              {click != 0 && errors && !errors.type != 'array.min' ? (
                <p>{errors?.message}</p>
              ) : null}
              <div>
                <Button text="Cancel" handler={closeModal} />
                <Button text="Save" handler={handleSubmit(onSubmit)} />
              </div>
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
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan={9} className={styles.date}>
                <Button text="<" handler={earlier} />
                {formatDate(startDate)} - {formatDate(endDate)}
                <Button text=">" handler={latter} />
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
            {filterEmployee(selectedProject).map((employee, index) => (
              <TableRow
                employee={employee}
                timesheets={timeSheetList}
                key={index}
                projectId={selectedProject._id}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.buttonContainer}></div>
      </div>
    );
  }
};

export default PmTimeSheet;
