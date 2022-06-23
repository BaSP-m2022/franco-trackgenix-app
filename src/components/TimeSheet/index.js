/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheets, postTimeSheet, putTimeSheet } from '../../redux/timeSheets/thunks';
import { clearError } from '../../redux/timeSheets/actions';
import { getEmployees } from '../../redux/employees/thunks';
import { getTasks } from '../../redux/tasks/thunks';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import LoadingScreen from '../Shared/LoadingScreen';
import SelectDropdown from '../Shared/SelectDropdown';
import styles from './form.module.css';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const schema = Joi.object({
  totalHours: Joi.number(),
  status: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  employeeId: Joi.string().required(),
  tasks: Joi.array().items(Joi.object({ _id: Joi.string().required() }))
});

const mapTasks = (tasks) => {
  return tasks.map((task) => {
    const _id = typeof task._id == 'object' ? task._id?._id : task._id;
    return { _id };
  });
};

const TimeSheetForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, control, setValue, watch } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema),
    defaultValues: {
      totalHours: '',
      status: '',
      startDate: '',
      endDate: '',
      employeeId: ''
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks'
  });
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [tasksOptions, setTasksOptions] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const employees = useSelector((state) => state.employees.list);
  const tasks = useSelector((state) => state.tasks.list);
  const timeSheet = useSelector((state) => state.timeSheets.timeSheet);
  const loading = useSelector((state) => state.timeSheets.loading);
  const errorError = useSelector((state) => state.timeSheets.error);

  const statusOption = [
    { value: 'To do', label: 'To do' },
    { value: 'In progress', label: 'In progress' },
    { value: 'Done', label: 'Done' }
  ];

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
    if (errorError) {
      openModal();
    }
  }, [employees]);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(getTasks());
    }
    setTasksOptions(
      tasks.map((task) => {
        return { value: task._id, label: task.description };
      })
    );
  }, [tasks]);

  useEffect(() => {
    if (timeSheet._id) {
      setValue('tasks', mapTasks(timeSheet.tasks));
      setValue('totalHours', timeSheet.totalHours);
      setValue('status', timeSheet.status);
      setValue('startDate', timeSheet.startDate.slice(0, 10));
      setValue('endDate', timeSheet.endDate.slice(0, 10));
      setValue('employeeId', timeSheet.employeeId._id);
      setRequestType('PUT');
    }
  }, [timeSheet._id]);

  const routeChange = () => {
    dispatch(getTimeSheets());
    const path = `/time-sheets`;
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

  const onSubmit = (data) => {
    const body = JSON.stringify({
      totalHours: data.totalHours,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      employeeId: data.employeeId,
      tasks: data.tasks
    });

    if (requestType === 'PUT') {
      setModalTitle('TimeSheet Updated');
      setModalText('TimeSheet has been updated');
      dispatch(putTimeSheet(timeSheet._id, body));
      openModal();
    } else {
      setModalTitle('TimeSheet Created');
      setModalText('TimeSheet has been created');
      dispatch(postTimeSheet(body));
      openModal();
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h3>{requestType === 'PUT' ? 'Update Time Sheet' : 'Add Time Sheet'}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="totalHours"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              className={styles.label}
              name="Total Hours"
              value={value}
              placeholder="Total Hours"
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <SelectDropdown
              options={[
                { label: `Active`, value: 'active' },
                { label: `Inactive`, value: 'inactive' }
              ]}
              className={styles.label}
              name="Status"
              value={value}
              placeholder="Status"
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              className={styles.label}
              name="Start Date"
              type="date"
              value={value}
              placeholder="Start Date"
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              className={styles.label}
              name="End Date"
              type="date"
              value={value}
              placeholder="End Date"
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="employeeId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <SelectDropdown
              name="Employee"
              onChange={onChange}
              value={value}
              props="employeeId"
              required={true}
              type="text"
              options={employeeOptions}
              disabled={loading}
            />
          )}
        />

        <div className={styles.addEmployeeDiv}>
          <ul className={styles.taskUl}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.li}>
                <Controller
                  control={control}
                  name={`tasks[${index}]._id`}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <SelectDropdown
                      options={tasksOptions}
                      className={styles.label}
                      name="Task"
                      value={value}
                      placeholder="Task"
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
                <Button type={'delete'} text={'Delete'} handler={() => remove(index)} />
              </li>
            ))}
          </ul>
          <Button
            text={'Add new Task to Time-Sheet'}
            type="button"
            handler={(e) => {
              e.preventDefault();
              append({ _id: '' });
            }}
          />
        </div>

        <div>
          <div className={styles.buttonDiv}>
            <Button
              text="Return"
              handler={() => {
                dispatch(clearError());
                routeChange();
              }}
            />
            <Button text={requestType === 'PUT' ? 'Update' : 'Save'} />
          </div>
          <Modal
            modalTitle={errorError ? 'error' : modalTitle}
            isOpen={isOpen}
            handleClose={closeModal}
          >
            <p className={styles.message}>{errorError ? errorError : modalText}</p>
            <div>
              <Button text="OK" handler={!errorError ? routeChange : closeModal} />
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default TimeSheetForm;
