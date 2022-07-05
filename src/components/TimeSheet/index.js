import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheets, postTimeSheet, putTimeSheet } from '../../redux/timeSheets/thunks';
import { clearError } from '../../redux/timeSheets/actions';
import { getEmployees } from '../../redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
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
  tasks: Joi.array().items(
    Joi.object({
      description: Joi.string().min(3).max(50).required(),
      workedHours: Joi.number().min(1).required(),
      projectId: Joi.string().required(),
      date: Joi.date().required()
    })
  ),
  totalHours: Joi.number(),
  status: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date()
    .required()
    .min(Joi.ref('startDate'))
    .message('End Date must be greater than or equal to Start Date'),
  employeeId: Joi.string().required()
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
  const { handleSubmit, control, setValue } = useForm({
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

  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('POST');
  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [click, setClick] = useState(0);
  const [projectsOptions, setProjectsOptions] = useState([]);

  const employees = useSelector((state) => state.employees.list);
  const timeSheet = useSelector((state) => state.timeSheets.timeSheet);
  const loading = useSelector((state) => state.timeSheets.loading);
  const errorError = useSelector((state) => state.timeSheets.error);
  const projects = useSelector((state) => state.projects.list);

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
    if (!projects.length) {
      dispatch(getProjects());
    }
    setProjectsOptions(
      projects.map((project) => {
        return {
          label: project.name,
          value: project._id
        };
      })
    );
  }, [projects]);

  useEffect(() => {
    if (timeSheet._id) {
      setValue('tasks', mapTasks(timeSheet.tasks));
      setValue('totalHours', timeSheet.totalHours);
      setValue('status', timeSheet.status);
      setValue('startDate', timeSheet.startDate.slice(0, 10));
      setValue('endDate', timeSheet.endDate.slice(0, 10));
      setValue('employeeId', timeSheet.employeeId?._id);
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
      <h3 className={styles.tittle}>
        {requestType === 'PUT' ? 'Update Time Sheet' : 'Add Time Sheet'}
      </h3>
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
              error={error?.message}
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
                      text={'Delete'}
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
